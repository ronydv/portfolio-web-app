package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

import static jakarta.persistence.CascadeType.*;

@Setter @Getter
@Table(name = "product")
@Entity
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(nullable = false)
    private Integer price;

    private Integer quantity;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDateTime addedAt = LocalDateTime.now();

    private Boolean status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {PERSIST,MERGE}, orphanRemoval = true)
    private Set<ProductCategory> productCategories=new HashSet<>();


    //////constructor setters, getters and other methods
    public Product(){}
    public Product(String name, Integer price, Integer quantity){
        this.name=name;
        this.price=price;
        this.quantity=quantity;
    }
    public Product(String name, Integer price, Integer quantity, Boolean status) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }

    public void addCategory(ProductCategory productCategory){
        this.productCategories.add(productCategory);
        productCategory.setProduct(this);
    }
    public void removeCategory(ProductCategory productCategory) {
        productCategories.remove(productCategory);
        productCategory.setProduct(null);
    }

    public String toString(){
        return "Product {\n"
                +"\tname: "+name+"\n"
                +"\tprice: "+price+"\n"
                +"\tquantity: "+quantity+"\n"
                +"\tadded at: "+ addedAt.toLocalDate()+"\n"
                +"\tcategories: "+productCategories.stream()
                                    .map(ProductCategory::getCategory)
                                    .toList()+"\n"
                +"}";
    }
}
