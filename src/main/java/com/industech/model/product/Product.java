package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.CascadeType.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
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

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product", cascade = {PERSIST, REMOVE /*or ALL*/})
    private List<ProductCategory> productCategories=new ArrayList<>();

    public void addProductCategories(ProductCategory productCategory){
        this.productCategories.add(productCategory);
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
