package com.industech;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.repository.auth.UserRepository;
import com.industech.repository.product.CategoryRepository;
import com.industech.repository.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@Transactional
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository,
										ProductRepository productRepository,
										CategoryRepository categoryRepository){

		return args -> {
/*			Set<Category> categories=Set.of(new Category("Electronics"),new Category("Industrial"));
			categoryRepository.saveAll(categories);
			Product wires=new Product("wires",4500,20, categories);
			System.out.println(wires);
			TODO: create brand entity
			productRepository.save(wires);*/
		};
	}

}
