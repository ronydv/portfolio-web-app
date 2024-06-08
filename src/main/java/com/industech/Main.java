package com.industech;

import com.industech.dto.order.OrderDetails;
import com.industech.model.auth.User;
import com.industech.model.order.Order;
import com.industech.model.product.Product;
import com.industech.repository.auth.UserRepository;
import com.industech.repository.order.OrderRepository;
import com.industech.repository.product.*;
import com.industech.service.order.OrderService;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
import com.industech.service.product.TypeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;

@Transactional
@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository,
										ProductService productService,
										ProductRepository productRepository,
										OrderRepository orderRepository,
										OrderService orderService) {
		return args -> {
			List<Order>orders=orderRepository.findAll();
			List<Order>selectedOrders=new ArrayList<>();
			List<OrderDetails>userOrders=new ArrayList<>();
			for (int i = 0; i < orders.size(); i++) {
				String currentName = orders.get(i).getUser().getName();
				selectedOrders.add(orders.get(i));
				if (i == (orders.size() - 1) || !currentName.equals(orders.get(i+1).getUser().getName())) {
					userOrders.add(new OrderDetails(selectedOrders));
					selectedOrders=new ArrayList<>();
				}
			}
			userOrders.forEach((System.out::println));
		};
	}
}
