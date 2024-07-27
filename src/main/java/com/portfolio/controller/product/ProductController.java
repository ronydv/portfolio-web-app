package com.portfolio.controller.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.product.PaginatedProducts;
import com.portfolio.dto.product.ProductDetails;
import com.portfolio.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
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



    //get methods for the Catalog component in the frontend
    @GetMapping("/products/{page}/{pageSize}/sector/{sector}/filter/{categories}/{types}")
    public ResponseEntity<PaginatedProducts> getProductsByCategoriesAndTypes(@PathVariable("page") Integer page,
                                                                             @PathVariable("pageSize") Integer pageSize,
                                                                             @PathVariable("sector") String sector,
                                                                             @PathVariable("categories")List<String>categories,
                                                                             @PathVariable("types") List<String>types){
        if (categories.get(0).contains("null")) categories = Collections.emptyList();
        if (types.get(0).contains("null")) types = Collections.emptyList();
        return new ResponseEntity<>(productService.
                getProductsByCategoriesAndTypes(page,pageSize,sector,categories,types), OK);
    }

    @GetMapping("/products/{page}/{pageSize}/sector/{sector}")
    public ResponseEntity<PaginatedProducts> getAllProductsBySector(@PathVariable("page") Integer page,
                                                                    @PathVariable("pageSize") Integer pageSize,
                                                                    @PathVariable("sector") String sector){
        return new ResponseEntity<>(productService.getProductsBySector(page,pageSize,sector), OK);
    }

    @GetMapping("/products/{words}/{page}/{pageSize}")
    public ResponseEntity<PaginatedProducts> getProductsBySearch(@PathVariable("words") String wordsToRegex,
                                                                 @PathVariable("page") Integer page,
                                                                 @PathVariable("pageSize") Integer pageSize){
        return new ResponseEntity<>(productService.searchProducts(wordsToRegex,page,pageSize), OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDetails> getProductById(@PathVariable("id") Long id){
        return new ResponseEntity<>(productService.getProductById(id), OK);
    }

    //methods for the ProductsDashboard component in the frontend
    @GetMapping("/products")
    @PreAuthorize("hasRole('admin:read')")
    public ResponseEntity<List<ProductDetails>> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), OK);
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('admin:create')")
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
    @PreAuthorize("hasRole('admin:update')")
    public ResponseEntity<ProductDetails> updateProduct(@RequestBody ProductDetails product){
        return new ResponseEntity<>(productService.updateProduct(product), OK);
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('admin:delete')")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id){
        return new ResponseEntity<>(productService.deleteProduct(id),OK);
    }

    @GetMapping("/products/sector/{sector}")
    @PreAuthorize("hasRole('admin:read')")
    public ResponseEntity<Long> getTotalProductsBySector(@PathVariable("sector")String sector){
        return new ResponseEntity<>(productService.getTotalProductsBySector(sector),OK);
    }
}
