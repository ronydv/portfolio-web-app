package com.industech;

import com.industech.repository.product.*;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
import com.industech.service.product.TypeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageRequest;
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
	CommandLineRunner commandLineRunner(ProductService productService,
										CategoryService categoryService,
										CategoryRepository categoryRepo,
										SectorRepository sectorRepository,
										CustomRepository customRepository,
										TypeRepository typeRepository,
										TypeService typeService,
										ProductRepository productRepo) {
		return args -> {
			List<String> categories = new ArrayList<>();
			/*categories.add("Cat-a");*/
			List<String> types = new ArrayList<>();
			types.add("Type 1");
/*			System.out.println("is categories empty? "+categories.isEmpty());

			System.out.println(productRepo.findProductsBySectorCategoriesAndTypes("designs",
					categories.isEmpty()  ? null:categories,
					types.isEmpty() ? null:types));*/

			PageRequest pageRequest = PageRequest.of(0, 4);
			System.out.println(customRepository.findProductsBySectorCategoriesAndTypes("designs",
					categories.isEmpty()  ? null:categories,
					types.isEmpty() ? null:types,pageRequest));
		};
	}
}