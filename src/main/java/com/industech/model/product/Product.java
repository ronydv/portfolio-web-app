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

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {PERSIST,MERGE}, orphanRemoval = true)
    private Set<ProductCategory> productCategories=new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {PERSIST, REMOVE}, orphanRemoval = true)
    private Set<Image> images=new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_sector",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id",
                          foreignKey = @ForeignKey(name = "product_id_fk")),
            inverseJoinColumns = @JoinColumn(name="sector_id", referencedColumnName = "id",
                          foreignKey = @ForeignKey(name = "sector_id_fk")))
    private Set<Sector> sectors=new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = {PERSIST,MERGE})
    @JoinTable(name = "product_type",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "product_id_fk")),
            inverseJoinColumns = @JoinColumn(name="type_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "type_id_fk")))
    private Set<Type> types=new HashSet<>();

    //////constructor setters, getters and other methods
    public Product(){}
    public Product(String name, String description) {
        this.name = name;
        this.description=description;
    }
    public Product(String name, String description,
                   Set<Sector> sectors, Set<Type> types) {
        this.name = name;
        this.description=description;
        this.sectors=sectors;
        this.types=types;
    }

    public void addCategory(ProductCategory productCategory){
        this.productCategories.add(productCategory);
        productCategory.setProduct(this);
    }
    public void removeCategory(ProductCategory productCategory) {
        productCategories.remove(productCategory);
        productCategory.setProduct(null);
    }

    public void addImage(Image image){
        this.images.add(image);
        image.setProduct(this);
    }
    public void removeImage(Image image){
        this.images.remove(image);
        image.setProduct(null);
    }

    public String toString(){
        return "Product {\n"
                +"\tid: "+id+"\n"
                +"\tproduct name: "+name+"\n"
                +"\tsector: "+sectors+"\n"
                +"\tproduct type: "+types+"\n"
                +"\tcategories: "+productCategories.stream()
                                    .map(ProductCategory::getCategory)
                                    .toList()+"\n"
                +"}";
    }
}
