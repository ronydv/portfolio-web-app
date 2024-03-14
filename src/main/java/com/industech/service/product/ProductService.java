package com.industech.service.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.dto.product.ProductDetails;
import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.ProductRepository;
import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;

    public ProductDetails getProduct(Integer id){
        return productRepository.findById(id)
                .map( found -> {
                    ProductDetails product= new ProductDetails(found);
                    found.getProductCategories().forEach( item ->{
                        product.addCategory(new CategoryDetails(item.getCategory()));
                    });
                    return product;
                }).orElseGet(()-> {
                    log.error(" product not found");
                    return null;
                });
    }

    public ProductDetails saveProduct(ProductDetails productDetails) {
        Product product = new Product(productDetails.getName(),productDetails.getPrice(),
                                      productDetails.getQuantity(), productDetails.getStatus());
        List<CategoryDetails>categories=new ArrayList<>();
        productDetails.getProductCategories().forEach(categoryName -> {
            //check if the incoming list of categories exists in the database before adding to the product
            Category category = categoryService.getCategory(categoryName.getName());
            if (category != null){
                product.addCategory(ProductCategory.add(product, category));//map categories to the database
                categories.add(new CategoryDetails(category));// map categories to the DTO
            }
        });
        return new ProductDetails(productRepository.save(product),categories);
        //throw exception if the parameter is null or if the product with brand already exists
    }

    public ProductDetails updateProduct(ProductDetails product){
        Product toUpdate=productRepository.getReferenceById(product.getId());
        toUpdate.setName(product.getName());
        toUpdate.setPrice(product.getPrice());
        toUpdate.setQuantity(product.getQuantity());
        toUpdate.setStatus(product.getStatus());
        List<CategoryDetails>categories=new ArrayList<>();

        if(!toUpdate.getProductCategories().isEmpty()){
            //remove association with product_categories table before inserting new data
            List<ProductCategory> toRemove = new ArrayList<>(toUpdate.getProductCategories());
            toRemove.forEach(toUpdate::removeCategory);
        }
        //add incoming categories to the product to be updated
        product.getProductCategories().forEach(item -> {
            Category category = categoryService.getCategory(item.getName());
            if(category != null ){
                toUpdate.addCategory(ProductCategory.add(toUpdate, category));//map to the database
                categories.add(new CategoryDetails(category));// map to the DTO
            }
        });
        return new ProductDetails(productRepository.save(toUpdate),categories);
    }

    public void deleteProduct(Integer id){
        productRepository.findById(id)
                .ifPresent(product -> {
                    List<ProductCategory> toRemove = new ArrayList<>(product.getProductCategories());
                    for (ProductCategory productCategory : toRemove) {
                        product.removeCategory(productCategory);
                    }
                    productRepository.delete(product);
                });
    }
}