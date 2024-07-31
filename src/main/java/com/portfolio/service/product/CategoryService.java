package com.portfolio.service.product;

import com.portfolio.dto.product.CategoryDetails;
import com.portfolio.exception.ProductException;
import com.portfolio.model.product.Category;
import com.portfolio.model.product.ProductCategory;
import com.portfolio.repository.product.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<CategoryDetails> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            log.error("No categories found -> getCategories()");
            throw new ProductException("No categories have been found", HttpStatus.NOT_FOUND);
        } else {
            return categories.stream()
                    .map(CategoryDetails::new)
                    .collect(Collectors.toList());
        }
    }
    public List<CategoryDetails> getCategoriesBySector(String sector){
        List<Category> categories = categoryRepository.findCategoriesBySector(sector);
        if(categories.isEmpty()){
            log.error("No categories found in sector: "+sector+" -> getCategoriesBySector()");
            throw new ProductException("No categories have been found in sector: "+sector, HttpStatus.NOT_FOUND);
        } else {
            return categories.stream()
                    .map(CategoryDetails::new)
                    .collect(Collectors.toList());
        }
    }

    public CategoryDetails saveCategory(String categoryName){
        try{
            if(categoryRepository.findByName(categoryName).isEmpty() && !categoryName.isBlank()){
                String formatName=categoryName.substring(0, 1).toUpperCase() +
                                  categoryName.substring(1).toLowerCase();
                Category category= categoryRepository.save(new Category(formatName));
                return new CategoryDetails(category);
            }else{
                String message= categoryName.isBlank() ? "Category name is empty":
                                                         "Category already exists";
                log.error("\u001B[33mCategory: \u001B[35m'"+categoryName+"'\u001B[0m " + message+"\u001B[0m");
                throw new ProductException(message);//throw exception for  duplicate entries
            }
        }catch(Exception e){//throw exception for  null values
            if(e.getLocalizedMessage().contains("String.isBlank()")) log.error(e.getMessage());
            throw new ProductException(e.getMessage(), HttpStatus.BAD_REQUEST);
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
