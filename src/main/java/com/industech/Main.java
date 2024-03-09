package com.industech;

import com.industech.model.product.Category;
import com.industech.service.CategoryService;
import com.industech.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProductService productService,
										CategoryService categoryService) {
		return args -> {
/*			categoryService.createCategories("Electronics");
			categoryService.createCategories("Connections");*/
			//productService.saveProduct(new HashSet<>(Set.of("Electronics","Connections")));

			productService.deleteProduct(1);
			productService.deleteProduct(2);

		};
	}

}
