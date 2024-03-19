package com.industech.controller.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.service.product.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class CategoryController {

    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDetails>> getCategories(){
        return new ResponseEntity<>(categoryService.getCategories(),OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryDetails> saveCategory(@RequestBody CategoryDetails categoryName){
        return new ResponseEntity<>(categoryService.saveCategory(categoryName.getName()),CREATED);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String>  deleteCategory(@PathVariable("id") Integer id){
        return new ResponseEntity<>(categoryService.deleteCategory(id),OK);
    }
}
