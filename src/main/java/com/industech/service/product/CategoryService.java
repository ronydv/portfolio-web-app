package com.industech.service.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.exception.ProductException;
import com.industech.model.product.Category;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        try{
            if(categoryRepository.findByName(categoryName).isEmpty() && !categoryName.isBlank()){
                Category category= categoryRepository.save(new Category(categoryName));
                return new CategoryDetails(category);
            }else{
                String message=(categoryName.isBlank() ?"categoryName is empty":"already exists")+"\u001B[0m";
                log.error("\u001B[33mCategory: \u001B[35m'"+categoryName+"'\u001B[0m " + message+"\u001B[0m");
                throw new ProductException(message,HttpStatus.UNAUTHORIZED);//throw exception for  duplicate entries
            }
        }catch(Exception e){//throw exception for  null values
            if(e.getLocalizedMessage().contains("String.isBlank()")) log.error(e.getMessage());
            throw new ProductException(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    public String deleteCategory(Integer id){
        return categoryRepository.findById(id)
                .map(category -> {
                    List<ProductCategory> toRemove = new ArrayList<>(category.getProductCategories());
                    for (ProductCategory productCategory : toRemove) {
                        category.removeProduct(productCategory);//remove association with product_categories table
                    }
                    categoryRepository.delete(category);
                    return "Category deleted successfully";
                }).orElseGet(()-> {
                    log.error("\u001B[35mCategory to delete doesn't exists\u001B[0m");
                    throw new ProductException("Category to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }
}
