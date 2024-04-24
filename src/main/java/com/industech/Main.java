package com.industech;

import com.industech.dto.product.ProductDetails;
import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.model.product.Sector;
import com.industech.repository.product.CategoryRepository;
import com.industech.repository.product.ProductRepository;
import com.industech.repository.product.SectorRepository;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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
										SectorRepository sectorRepository,
										ProductRepository productRepo) {
		return args -> {
/*			Optional<Sector> sector=sectorRepository.findSectorByName("designs");
			Set<Sector> sectors = new HashSet<>();
			sectors.add(sector.get());
			Product product=new Product("ProductName","A description",sectors);
			productRepo.save(product);*/
			//TODO: create entity for product type
		};
	}
}