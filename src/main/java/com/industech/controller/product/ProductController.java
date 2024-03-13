package com.industech.controller.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.dto.product.ProductDetails;
import com.industech.service.product.CategoryService;
import com.industech.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }
    @PostMapping("/category")
    public ResponseEntity<CategoryDetails> saveCategory(@RequestBody CategoryDetails categoryName){
        return new ResponseEntity<>(categoryService.saveCategory(categoryName.name()),OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDetails> getProduct(@PathVariable("id") Integer id){
        return new ResponseEntity<ProductDetails>(productService.getProduct(id), OK);
    }

    @PostMapping("/product")
    public ResponseEntity<ProductDetails> saveProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<ProductDetails>(productService.saveProduct(product), OK);
    }

    @PutMapping("/product")
    public ResponseEntity<ProductDetails> updateProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<ProductDetails>(productService.updateProduct(product), OK);
    }
}
