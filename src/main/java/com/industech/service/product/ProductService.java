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


    //todo:replace void with a Response Object
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