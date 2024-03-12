package com.industech.service.product;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.ProductRepository;
import com.industech.service.product.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;


    public void saveProduct(Product product,Set<String> categoryNames) {
        if(!categoryNames.isEmpty()){
            categoryNames.forEach(categoryName -> {
                Category category = categoryService.getCategory(categoryName);
                //this conditional avoids to shut down the server if there is an exception
                if(category != null) product.addCategory(
                        ProductCategory.addProductAndCategory(product, category));
            });
        }
        productRepository.save(product);
    }

    public void updateProduct(Product product){
        Product productToUpdate=productRepository.getReferenceById(product.getId());
        System.out.println(productToUpdate);
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
                    ProductCategory.addProductAndCategory(product, category));
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