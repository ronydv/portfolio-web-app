package com.industech.service;

import com.industech.model.product.Category;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory(String categoryName){
        return categoryRepository.findByName(categoryName);
    }

    public void createCategories(String categoryName){
        Category category = new Category(categoryName);
        categoryRepository.save(category);
    }
    public void deleteCategory(Integer id){
        categoryRepository.findById(id)
                .ifPresent(category -> {
                    List<ProductCategory> toRemove = new ArrayList<>(category.getProductCategories());
                    for (ProductCategory productCategory : toRemove) {
                        //remove association with product_categories table
                        category.removeProduct(productCategory);
                    }
                    categoryRepository.delete(category);
                });
    }
}
