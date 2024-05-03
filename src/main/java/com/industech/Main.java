package com.industech;

import com.industech.repository.product.CategoryRepository;
import com.industech.repository.product.CustomRepository;
import com.industech.repository.product.ProductRepository;
import com.industech.repository.product.SectorRepository;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
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
	CommandLineRunner commandLineRunner(ProductService productService,
										CategoryService categoryService,
										CategoryRepository categoryRepo,
										SectorRepository sectorRepository,
										CustomRepository customRepository,
										ProductRepository productRepo) {
		return args -> {

		};
	}
}