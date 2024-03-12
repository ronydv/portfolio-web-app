package com.industech.service.product;

import com.industech.model.product.Category;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Transactional
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory(String categoryName){
       return categoryRepository.findByName(categoryName)
               .orElseGet( () ->{
                   log.info("\u001B[33mCategory"+categoryName+" not found\u001B[0m");
                   return null;
               });
    }

    public Category createCategory(String categoryName){
        if(getCategory(categoryName) == null){
            return categoryRepository.save(new Category(categoryName));
        }else{
            log.info("\u001B[33mCategory already exists\u001B[0m");
            return null;//throw custom exception
        }

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
