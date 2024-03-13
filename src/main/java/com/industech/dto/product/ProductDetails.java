package com.industech.dto.product;

import com.industech.model.product.Category;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;

@Setter @Getter
public class ProductDetails {
     private Integer id;
     private String name;
     private Integer price;
     private Integer quantity;
     private LocalDateTime addedAt;
     private Boolean status;
     private List<CategoryDetails> productCategories=new ArrayList<>();

     public ProductDetails(){}
    public ProductDetails(Integer id, String name, Integer price,
                          Integer quantity, LocalDateTime addedAt, Boolean status) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.addedAt = addedAt;
        this.status = status;
    }
    public void addCategory(CategoryDetails category){ this.productCategories.add(category); }
}


