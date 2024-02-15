package com.industech;

import com.industech.model.Privilege;
import com.industech.model.RefreshToken;
import com.industech.model.Role;
import com.industech.model.User;
import com.industech.repository.PrivilegeRepository;
import com.industech.repository.RefreshTokenRepository;
import com.industech.repository.RoleRepository;
import com.industech.repository.UserRepository;
import com.industech.service.AuthenticationService;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@SpringBootApplication
@Transactional
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository,
										RoleRepository roleRepository,
										PrivilegeRepository privilegeRepository,
										RefreshTokenRepository tokenRepository,
										AuthenticationService authService
										){

		return args -> {
/*			Optional<User> user=userRepository.findByEmail("user@mail.com");
			RefreshToken refreshToken=new RefreshToken();
			refreshToken.setToken("34sd-34t43efsd-443-grfd");
			refreshToken.setUser(user.get());
			tokenRepository.save(refreshToken);*/
			//userRepository.deleteById(8L);
			//tokenRepository.delete(user.get().getRefreshToken());

/*			Optional<User> user=userRepository.findByEmail("test@mail.com");
			Optional<RefreshToken> token=tokenRepository.findByToken(user.get().getRefreshToken().getToken());
			System.out.println(token.get());*/
			//TODO: create update method for RefreshToken entity
			// to avoid conflicts in duplicate entries for unique constraint from user_id
			// in refresh_token table
		};
	}

}
