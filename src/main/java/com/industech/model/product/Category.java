package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.CascadeType.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "category")
@Entity
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "category",cascade = {PERSIST, REMOVE})
    private List<ProductCategory> productCategories=new ArrayList<>();

    public void addProductCategories(ProductCategory productCategory){
        this.productCategories.add(productCategory);
    }

    public String toString(){
        return "{"+
                "\n\t\tcategory??????????????: "+ name +"\n"+
                "\t}";
    }
}
