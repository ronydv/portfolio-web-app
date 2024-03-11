package com.industech;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
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
			/*TODO: MODIFY Category to unique TO AVOID DUPLICATE ENTRIES and create service to avoid duplicates for same name and same categories*/
	/*		categoryService.createCategories("Electronics");
			categoryService.createCategories("Connections");
			categoryService.createCategories("Design");
			categoryService.createCategories("Installation");*/
			//productService.saveProduct(new HashSet<>(List.of("Electronics","Connections")));
/*			Product product = new Product("Ethernet wires", 4500, 20);
			product.setId(25);
			new HashSet<>(Set.of("Connections","Installation")).forEach(categoryName -> {
				Category category = categoryService.getCategory(categoryName);
				product.addCategory(
						ProductCategory.addProductAndCategory(product, category));
			});
			productService.updateProduct(product);*/
			//categoryService.deleteCategory(34);
			//productService.deleteProduct(26);


		};
	}

}
