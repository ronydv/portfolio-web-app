package com.portfolio.model.product;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.FetchType.LAZY;

@Setter @Getter
@Table(name = "type")
@Entity
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String productType;

    @ManyToMany(mappedBy = "types", fetch = LAZY)
    private Set<Product> products=new HashSet<>();

    public Type(){}
    public Type(String productType){ this.productType = productType; }

    //remove product from the relation without deleting the product in the database
    public void removeProduct(Product product){
        product.getTypes().remove(this);
    }

    @Override
    public String toString() {
        return "ProductType: id: "+id+", name: "+ productType;
    }
}
