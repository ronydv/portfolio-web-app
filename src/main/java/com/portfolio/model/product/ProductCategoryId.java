package com.portfolio.model.product;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Setter @Getter
@Embeddable
public class ProductCategoryId implements Serializable {

    @Column(name = "product_id")
    private Long productId;//this instance is mapped to @MapsId in ProductCategory entity
    @Column(name = "category_id")
    private Integer categoryId;//this instance is mapped to @MapsId in ProductCategory entity

    public ProductCategoryId(){}
    public ProductCategoryId(Long productId, Integer categoryId) {
        this.productId = productId;
        this.categoryId = categoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductCategoryId that = (ProductCategoryId) o;
        return Objects.equals(this.productId, that.productId) && Objects.equals(this.categoryId, that.categoryId);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((productId == null) ? 0 : productId.hashCode());
        result = prime * result
                + ((categoryId == null) ? 0 : categoryId.hashCode());
        return result;
    }
}
