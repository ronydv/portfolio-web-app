package com.industech.dto.product;

import com.industech.model.product.Product;
import com.industech.model.product.Sector;
import com.industech.model.product.Type;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/*
this DTO is created specifically to avoid this exception:
** Response already committed. Ignoring:HttpMessageNotWritableException:
** Could not write JSON: Infinite recursion (StackOverflowError)
*/

@Setter @Getter
public class ProductDetails {
    private Long id;
    private String name;
    private String description;
    private List<CategoryDetails> categories = new ArrayList<>();
    private List<ImageDetails>images=new ArrayList<>();
    private String sector;
    private String productType;


    public ProductDetails() {}
    public ProductDetails(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description=product.getDescription();
        if(!product.getSectors().isEmpty()){
            this.sector= product.getSectors().stream().map(Sector::getName).findFirst().get();
        }
        if(!product.getTypes().isEmpty()){
            this.productType=product.getTypes().stream().map(Type::getProductType)
                    .findFirst().orElse("null");
        }
    }
    public ProductDetails(Product product,List<CategoryDetails> categories) {
        this.id = product.getId();
        this.name = product.getName();
        this.description=product.getDescription();
        this.categories = categories;
        if(!product.getSectors().isEmpty()){
            this.sector= product.getSectors().stream().map(Sector::getName).findFirst().get();
        }
        if(!product.getTypes().isEmpty()){
            this.productType=product.getTypes().stream().map(Type::getProductType)
                    .findFirst().orElse("null");
        }
    }
    public ProductDetails(Product product,
                          List<CategoryDetails> categories, List<ImageDetails> images) {
        this.id = product.getId();
        this.name = product.getName();
        this.description=product.getDescription();
        this.categories = categories;
        this.images=images;
        if(!product.getSectors().isEmpty()){
            this.sector= product.getSectors().stream().map(Sector::getName).findFirst().get();
        }
        if(!product.getTypes().isEmpty()){
            this.productType=product.getTypes().stream().map(Type::getProductType)
                    .findFirst().orElse("null");
        }
    }

    public void addCategory(CategoryDetails category) {
        this.categories.add(category);
    }
    public void addImage(ImageDetails image){this.images.add(image);}

    public String toString(){
        return "Product {\n"
                +"\tid: "+id+"\n"
                +"\tname: "+name+"\n"
                +"\tcategories: "+categories.stream().toList() +"\n"
                +"\tsector: "+sector+"\n"
                +"\tproduct type: "+productType+"\n"
                +"}";
    }
}


