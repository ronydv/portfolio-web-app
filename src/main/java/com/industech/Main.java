package com.industech;

import com.industech.dto.order.MonthlyOrders;
import com.industech.repository.auth.UserRepository;
import com.industech.repository.order.OrderRepository;
import com.industech.repository.product.*;
import com.industech.service.auth.UserService;
import com.industech.service.order.OrderService;
import com.industech.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageRequest;
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

			for(MonthlyOrders order:orderService.getOrdersByMonth()){
				System.out.println(order);
			}
		};
	}
}