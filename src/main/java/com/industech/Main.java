package com.industech;

import com.industech.model.product.Product;
import com.industech.repository.product.ProductRepository;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Transactional
@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProductService productService,
										CategoryService categoryService,
										ProductRepository productRepo) {
		return args -> {
			/*TODO: create controllers for productService and categoryService with its DTOs*/
			categoryService.createCategory("Electronics");
			categoryService.createCategory("Installation");
			Product product = new Product("wires", 4500, 20);
			Set<String>categories=new HashSet<>(Set.of("Connections","Installation"));
			productService.saveProduct(product,categories);

		};
	}

}














/*/*			Product product = new Product("Ethernet wires", 4500, 20);
			product.setId(25);
			new HashSet<>(Set.of("Connections","Installation")).forEach(categoryName -> {
				Category category = categoryService.getCategory(categoryName);
				product.addCategory(
						ProductCategory.addProductAndCategory(product, category));
			});
			productService.updateProduct(product);*/