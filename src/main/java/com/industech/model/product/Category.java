package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.CascadeType.*;

@Setter @Getter
@Table(name = "category")
@Entity
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category",cascade = {PERSIST,MERGE}, orphanRemoval = true)
    private List<ProductCategory> productCategories=new ArrayList<>();


    public Category(){}
    public Category(String name){ this.name=name;}

    public Category(Integer id, String name, List<ProductCategory> productCategories) {
        this.id = id;
        this.name = name;
        this.productCategories = productCategories;
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
