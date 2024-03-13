package com.industech;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
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
										CategoryRepository categoryRepo,
										ProductRepository productRepo) {
		return args -> {
			//TODO: create controllers for productService and categoryService with its DTOs

/*			Product updateProduct = new Product(1,"Ethernet wires", 5600, 12);
			new HashSet<>(Set.of("Installation","Electronics"))
					.forEach(cat ->{
						Category category = categoryRepo.findByName(cat).get();
						System.out.println(category+" inside main");
						updateProduct.addCategory(ProductCategory.add(updateProduct,category));
					});
			productService.updateProduct(updateProduct);*/

		};
	}
}