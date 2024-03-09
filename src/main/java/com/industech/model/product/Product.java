package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

import static jakarta.persistence.CascadeType.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "product")
@Entity
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String name;

    @NonNull @Column(nullable = false)
    private Integer price;

    @NonNull
    private Integer quantity;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDateTime added_at= LocalDateTime.now();

    private Boolean status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {PERSIST}, orphanRemoval = true)
    private List<ProductCategory> productCategories=new ArrayList<>();


    //////setters, getters and other methods
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
                +"\tadded at: "+added_at.toLocalDate()+"\n"
/*                +"\tcategories: "+productCategories.stream()
                                    .map(ProductCategory::getCategory)
                                    .toList()+"\n"*/
                +"}";
    }
}
