package com.portfolio.dto.product;

import com.portfolio.model.product.Category;
import lombok.Getter;
import lombok.Setter;

/*
this DTO is created specifically to avoid this exception:
** Response already committed. Ignoring:HttpMessageNotWritableException:
** Could not write JSON: Infinite recursion (StackOverflowError)
when fetching it in ProductService -> getProduct()
*/
@Setter @Getter
public class CategoryDetails {
    private Integer id;
    private String name;

    public CategoryDetails(){}
    public CategoryDetails(Category category){
        this.id=category.getId();
        this.name=category.getName();
    }

    @Override
    public String toString() {
        return "CategoryDetails{" +
                ", name='" + name + '\'' +
                '}';
    }
}
