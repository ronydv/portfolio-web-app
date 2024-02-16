package com.industech.service;

import com.industech.exception.TokenException;
import com.industech.model.AuthUser;
import com.industech.model.RefreshToken;
import com.industech.model.User;
import com.industech.repository.RefreshTokenRepository;
import com.industech.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TokenService {
    @Autowired private JwtEncoder jwtEncoder;
    @Autowired private UserRepository userRepository;
    @Autowired private RefreshTokenRepository tokenRepository;


    public String createJwtAccessToken(AuthUser user){
        Instant now = Instant.now();
        //Instant thirtyMinutes= ZonedDateTime.now().plusMinutes(30).toInstant();
        Instant thirtyMinutes=ZonedDateTime.now().plusMinutes(1).toInstant();
        String role = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(user.getUsername())//set unique identifier
                .expiresAt(thirtyMinutes)
                .claim("roles", role)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


    public RefreshToken createUUIDRefreshToken(User user) {
        Optional<RefreshToken> token= Optional.ofNullable(user.getRefreshToken());
        if(token.isPresent()){
            //return existing token if the user already has one, use update methods if necessary forward in development
            return user.getRefreshToken();
        }else{
            RefreshToken refreshToken = new RefreshToken(
                    UUID.randomUUID().toString(),
                    //ZonedDateTime.now().plusMinutes(1440).toInstant(),//24hs
                    ZonedDateTime.now().plusMinutes(3).toInstant(),
                    user);
            return tokenRepository.save(refreshToken);
        }
    }

    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return tokenRepository.findByToken(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            log.warn("checking token expiration...\ntoken expired, deleting token: "
                    + token.getToken() + " with id: " + token.getId()+" Please make a new login request");
            tokenRepository.delete(token);
            throw new TokenException("Refresh token: "+token.getToken()+" was expired. Please make a new login request");
        } else {
            log.info("\u001B[35mchecking token expiration...\nrefresh token still valid! :D\u001B[0m");
            return token;
        }
    }
}
/*
            RefreshToken tokenToUpdate=tokenRepository.getReferenceById(token.get().getId());
            tokenToUpdate.setToken(refreshToken.getToken());
            tokenToUpdate.setExpiryDate(refreshToken.getExpiryDate());
*/