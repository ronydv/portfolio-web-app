package com.industech.model.product;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Table(name = "image")
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(2048)")
    private String url;

    private String name;

    private String publicId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id",
                foreignKey = @ForeignKey(name="product_image_fk"))
    private Product product;

    public Image(){}
    public Image(String url, String name){
        this.url=url;
        this.name=name;
    }
    public Image(String url, String name, String publicId){
        this.url=url;
        this.name=name;
        this.publicId=publicId;
    }
}
