package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

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

    @NonNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_categories",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "product_id_fk")),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "category_id_fk")))
    private Set<Category> categories;

    public String toString(){
        return "Product {\n"
                +"\tname: "+name+"\n"
                +"\tprice: "+price+"\n"
                +"\tquantity: "+quantity+"\n"
                +"\tadded at: "+added_at.toLocalDate()+"\n"
                +"\tcategories: "+categories+"\n"
                +"}";
    }
}
