package com.portfolio;

import com.portfolio.repository.auth.UserRepository;
import com.portfolio.repository.order.OrderRepository;
import com.portfolio.repository.product.*;
import com.portfolio.service.auth.UserService;
import com.portfolio.service.order.OrderService;
import com.portfolio.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository,
										UserService userService,
										ProductService productService,
										ProductRepository productRepository,
										OrderRepository orderRepository,
										OrderService orderService) {
		return args -> {
			//
		};
	}
}