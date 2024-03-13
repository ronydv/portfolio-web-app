package com.industech.service.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.model.product.Category;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    protected Category getCategory(String categoryName){
       return categoryRepository.findByName(categoryName)
               .orElseGet( () ->{
                   log.info("\u001B[33mCategory: \u001B[35m'"+categoryName+"'\u001B[0m not found\u001B[0m");
                   return null;
               });
    }

    public CategoryDetails saveCategory(String categoryName){
        if(categoryRepository.findByName(categoryName).isEmpty()){
            Category category= categoryRepository.save(new Category(categoryName));
            return new CategoryDetails(category.getId(),category.getName());
        }else{
            log.info("\u001B[33mCategory: \u001B[35m'"+categoryName+"'\u001B[0m already exists\u001B[0m");
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
