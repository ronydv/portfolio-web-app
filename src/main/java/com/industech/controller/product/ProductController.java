package com.industech.controller.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.industech.dto.product.PaginatedProducts;
import com.industech.dto.product.ProductDetails;
import com.industech.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/products/{page}/{pageSize}/sector/{sector}")
    public ResponseEntity<PaginatedProducts> getAllProductsBySector(@PathVariable("page") Integer page,
                                                                  @PathVariable("pageSize") Integer pageSize,
                                                                  @PathVariable("sector") String sector){
        return new ResponseEntity<>(productService.getAllProductsBySector(page,pageSize,sector), OK);
    }

    @GetMapping("/products/{words}/{page}/{pageSize}")
    public ResponseEntity<PaginatedProducts> getProductsBySearch(@PathVariable("words") String wordsToRegex,
                                                                 @PathVariable("page") Integer page,
                                                                 @PathVariable("pageSize") Integer pageSize){
        return new ResponseEntity<>(productService.searchProducts(wordsToRegex,page,pageSize), OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDetails> getProductById(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.getProductById(id), OK);
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDetails> saveProduct(@RequestParam("product") String productJson,
                                                      @RequestParam("images") List<MultipartFile> files) {
        try{
            ProductDetails product = new ObjectMapper().readValue(productJson, ProductDetails.class);
            return new ResponseEntity<>(productService.saveProduct(product,files), CREATED);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/products")
    public ResponseEntity<ProductDetails> updateProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<>(productService.updateProduct(product), OK);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.deleteProduct(id),OK);
    }

    @GetMapping("/products/sector/{sector}")
    public ResponseEntity<Long> getTotalProductsBySector(@PathVariable("sector")String sector){
        return new ResponseEntity<>(productService.getTotalProductsBySector(sector),OK);
    }
}
