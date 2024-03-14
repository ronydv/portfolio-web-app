package com.industech.dto.product;

import com.industech.model.product.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
this DTO is created specifically to avoid this exception:
** Response already committed. Ignoring:HttpMessageNotWritableException:
** Could not write JSON: Infinite recursion (StackOverflowError)
*/

@Setter @Getter
public class ProductDetails {
    private Integer id;
    private String name;
    private Integer price;
    private Integer quantity;
    private LocalDateTime addedAt;
    private Boolean status;
    private List<CategoryDetails> productCategories = new ArrayList<>();

    public ProductDetails() {}
    public ProductDetails(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.addedAt = product.getAddedAt();
        this.status = product.getStatus();
    }
    public ProductDetails(Product product,List<CategoryDetails> productCategories ) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.addedAt = product.getAddedAt();
        this.status = product.getStatus();
        this.productCategories=productCategories;
    }

    public void addCategory(CategoryDetails category) {
        this.productCategories.add(category);
    }
}


