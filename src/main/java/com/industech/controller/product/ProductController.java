package com.industech.controller.product;

import com.industech.dto.product.ProductDetails;
import com.industech.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/products")
    public ResponseEntity<List<ProductDetails>> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDetails> getProduct(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.getProduct(id), OK);
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDetails> saveProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<>(productService.saveProduct(product), CREATED);
    }

    @PutMapping("/products")
    public ResponseEntity<ProductDetails> updateProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<>(productService.updateProduct(product), OK);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.deleteProduct(id),OK);
    }
}
