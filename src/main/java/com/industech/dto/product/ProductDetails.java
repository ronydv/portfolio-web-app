package com.industech.dto.product;

import com.industech.model.product.Image;
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
    private String brand;
    private String name;
    private Integer price;
    private Integer quantity;
    private LocalDateTime addedAt;
    private String description;
    private List<CategoryDetails> categories = new ArrayList<>();
    private List<ImageDetails>images=new ArrayList<>();

    public ProductDetails() {}
    public ProductDetails(Product product) {
        this.id = product.getId();
        this.brand=product.getBrand();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.addedAt = product.getAddedAt();
        this.description=product.getDescription();
    }
    public ProductDetails(Product product,List<CategoryDetails> categories) {
        this.id = product.getId();
        this.brand=product.getBrand();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.addedAt = product.getAddedAt();
        this.description=product.getDescription();
        this.categories = categories;
    }
    public ProductDetails(Product product,
                          List<CategoryDetails> categories, List<ImageDetails> images) {
        this.id = product.getId();
        this.brand=product.getBrand();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.addedAt = product.getAddedAt();
        this.description=product.getDescription();
        this.categories = categories;
        this.images=images;
    }

    public void addCategory(CategoryDetails category) {
        this.categories.add(category);
    }
    public void addImage(ImageDetails image){this.images.add(image);}

}


