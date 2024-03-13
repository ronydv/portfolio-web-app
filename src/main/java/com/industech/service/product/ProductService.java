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
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;

    public ProductDetails getProduct(Integer id){
        return productRepository.findById(id)
                .map( found -> {
                    ProductDetails product= new ProductDetails(found.getId(),found.getName(),found.getPrice(),
                                                    found.getQuantity(),found.getAddedAt(),found.getStatus());
                    found.getProductCategories().forEach( item ->{
                        product.addCategory(new CategoryDetails(item.getCategory().getId(),
                                                                item.getCategory().getName()));
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
            Category category = categoryService.getCategory(categoryName.name());
            if (category != null){
                product.addCategory(ProductCategory.add(product, category));
                categories.add(new CategoryDetails(category.getId(), category.getName()));
            }
        });
        productRepository.save(product);
        //after the product is stored, update productDetails with their generated ids and date from the database
        productDetails.setId(product.getId());
        productDetails.setAddedAt(product.getAddedAt());
        productDetails.setProductCategories(categories);
        //todo: throw exception if the parameter is null or if the product with brand already exists
        return productDetails;
    }



    public ProductDetails updateProduct(ProductDetails product){
        Product toUpdate=productRepository.getReferenceById(product.getId());
        log.info("\nproduct to update: "+toUpdate);
        toUpdate.setName(product.getName());
        toUpdate.setPrice(product.getPrice());
        toUpdate.setQuantity(product.getQuantity());

        //remove association with product_categories table before inserting new data
        if(!toUpdate.getProductCategories().isEmpty()){
            List<ProductCategory> toRemove = new ArrayList<>(toUpdate.getProductCategories());
            for (ProductCategory category : toRemove) {
                toUpdate.removeCategory(category);
            }
        }
        //add incoming categories to the product to be updated
        product.getProductCategories().forEach(item -> {
            Category category = new Category(item.id(),item.name());
            toUpdate.addCategory(
                    ProductCategory.add(toUpdate, category));
        });
        productRepository.save(toUpdate);
        return product;
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


/*
    public void updateProduct(Product product){
        Product productToUpdate=productRepository.getReferenceById(product.getId());
        log.info("product to update: "+productToUpdate);
        productToUpdate.setName(product.getName());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setQuantity(product.getQuantity());

        if(!productToUpdate.getProductCategories().isEmpty()){
            //remove association with product_categories table before inserting new data
            List<ProductCategory> toRemove = new ArrayList<>(productToUpdate.getProductCategories());
            for (ProductCategory productCategory : toRemove) {
                productToUpdate.removeCategory(productCategory);
            }
        }
        product.getProductCategories().forEach(cat -> {
            Category category = cat.getCategory();
            productToUpdate.addCategory(
                    ProductCategory.add(product, category));
        });
        productRepository.save(productToUpdate);
    }
* */