package com.industech.service;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.model.product.ProductCategoryId;
import com.industech.repository.product.CategoryRepository;
import com.industech.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;


    public void saveProduct(){
        Category electronic=categoryRepository.findByName("Electronics");
        Category connection=categoryRepository.findByName("Connections");
        Product wires=new Product("wires",4500,20);


        wires.addProductCategories(
                ProductCategory.addProductAndCategory(wires,electronic));
        wires.addProductCategories(
                ProductCategory.addProductAndCategory(wires,connection));

        //productRepository.save(wires);
        productRepository.deleteAll();
        //TODO: DELETE CATEGORY WITHOUT DELETING PRODUCT AND VICE-VERSA
    }
}
