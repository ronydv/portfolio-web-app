package com.portfolio.service.auth;

import com.portfolio.exception.TokenException;
import com.portfolio.model.auth.AuthUser;
import com.portfolio.model.auth.RefreshToken;
import com.portfolio.model.auth.User;
import com.portfolio.repository.auth.RefreshTokenRepository;
import com.portfolio.repository.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        Instant thirtyMinutes= ZonedDateTime.now().plusDays(1L).toInstant();
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

    public RefreshToken generateRefreshTokenForUser(User user){
        RefreshToken refreshToken = new RefreshToken(
                UUID.randomUUID().toString(),
                ZonedDateTime.now().plusWeeks(1L).toInstant(),//24hs
                user);
        return tokenRepository.save(refreshToken);
    }

    public RefreshToken createUUIDRefreshToken(User user) {
        Optional<RefreshToken> token= Optional.ofNullable(user.getRefreshToken());
        if(token.isPresent()){
            if (token.get().getExpiryDate().compareTo(Instant.now()) < 0) {
                tokenRepository.delete(token.get());
                return generateRefreshTokenForUser(user);
            }
            return user.getRefreshToken();
        }else{
            return generateRefreshTokenForUser(user);
        }
    }

    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return tokenRepository.findByToken(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
/*            log.warn("checking token expiration...\ntoken expired, deleting token: "
                    + token.getToken() + " with id: " + token.getId()+" Please make a new login request");*/
            tokenRepository.delete(token);
            throw new TokenException("Refresh token: "+token.getToken()+" has expired. Please log in again",
                    HttpStatus.UNAUTHORIZED);
        } else {
            //log.info("\u001B[35mchecking token expiration...\nrefresh token still valid! :D\u001B[0m");
            return token;
        }
    }
}