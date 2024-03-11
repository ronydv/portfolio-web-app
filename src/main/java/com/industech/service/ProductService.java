package com.industech.service;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
import com.industech.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryRepository;


    public void saveProduct(Set<String> categoryNames) {
        Product product = new Product("wires", 4500, 20);
        if(!categoryNames.isEmpty()){
            categoryNames.forEach(categoryName -> {
                Category category = categoryRepository.getCategory(categoryName);
                product.addCategory(
                        ProductCategory.addProductAndCategory(product, category));
            });
        }
        productRepository.save(product);
    }

    public void deleteProduct(Integer id){
        productRepository.findById(id)
                .ifPresent(product -> {
                    List<ProductCategory> toRemove = new ArrayList<>(product.getProductCategories());
                    for (ProductCategory productCategory : toRemove) {
                        product.removeCategory(productCategory);
                    }
                    productRepository.delete(product);
                });
    }
}