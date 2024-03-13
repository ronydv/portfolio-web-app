package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Setter @Getter
@Table(name = "product_category")
@Entity
public class ProductCategory {

    @EmbeddedId
    private ProductCategoryId id;

    @ManyToOne
    @MapsId("productId")//this comes from ProductCategoryId instance field
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name="product_id_fk"))
    private Product product;

    @ManyToOne
    @MapsId("categoryId")//this comes from ProductCategoryId instance field
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name="category_id_fk"))
    private Category category;

    public ProductCategory(){}
    public ProductCategory(ProductCategoryId id, Product product, Category category){
        this.id=id;
        this.product=product;
        this.category=category;
    }

    //add the embedded id, and entities here instead of adding ids in the service class
    public static ProductCategory add(Product product, Category category) {
        ProductCategoryId embeddedId = new ProductCategoryId(product.getId(), category.getId());
        return new ProductCategory(embeddedId, product, category);
    }
}
