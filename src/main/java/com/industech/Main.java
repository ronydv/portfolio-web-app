package com.industech;

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
/*			User user = userRepository.findById(2L).orElseThrow();
			Product product1=productRepository.findById(151L).orElseThrow();
			Product product2=productRepository.findById(155L).orElseThrow();
			Product product3=productRepository.findById(156L).orElseThrow();
			List<Product>products=new ArrayList<>(List.of(product1,product2,product3));*/
/*			for( Product product:products){
				Order order= Order.add(user,product);
				orderRepository.save(order);
			}*/
			//System.out.println(orderRepository.findAll());
/*			Long userId=2L;
			List<Long>productIds=List.of(151L,155L,156L);
			System.out.println(orderService.saveOrder(userId,productIds));*/

//TODO: ADD CONTROLLER FOR THIS SERVICE AND TEST IN THE FRONTEND WITH PAGINATION
			System.out.println(orderService.getOrdersByUser(1,15,true,2L));
		};
	}
}
/*
	Sort sortByFirstName = Sort.by(Sort.Direction.ASC, "firstName");
	PageRequest pages=PageRequest.of(0,10,sortByFirstName);
	Page<Student> students =studentRepository.findAll(pages);*/
