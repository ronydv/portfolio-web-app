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
			//TODO: create controllers for productService and categoryService with its DTOs
/*			categoryService.createCategory("Electronics");
			categoryService.createCategory("Installation");*/
/*			Product product = new Product("wires", 4500, 20);
			Set<String>categories=new HashSet<>(Set.of("Electronics","Installation"));
			System.out.println(productService.saveProduct(product,categories));*/
			//System.out.println(productService.getProduct(2));

/*			Product updateProduct = new Product("Ethernet wires", 5600, 12);
			updateProduct.setId(1);
			new HashSet<>(Set.of("Installation","Electronics"));
			productService.updateProduct(updateProduct);*/

		};
	}
}