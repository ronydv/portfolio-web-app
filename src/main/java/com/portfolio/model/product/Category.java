package com.portfolio.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.CascadeType.*;

@Setter @Getter
@Table(name = "category", uniqueConstraints = {
        @UniqueConstraint(name="category_name_uk", columnNames = {"name"}) })
@Entity
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category",cascade = {PERSIST,MERGE}, orphanRemoval = true)
    private Set<ProductCategory> productCategories=new HashSet<>();


    public Category(){}
    public Category(String name){ this.name=name;}
    public Category(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public void addProduct(ProductCategory productCategory){
        this.productCategories.add(productCategory);
        productCategory.setCategory(this);
    }
    public void removeProduct(ProductCategory productCategory) {
        productCategories.remove(productCategory);
        productCategory.setCategory(null);
    }

    public String toString(){
        return "{"+
                "\n\t\tcategory: "+ name +"\n"+
                "\t}";
    }
}
