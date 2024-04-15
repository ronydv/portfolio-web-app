package com.industech.dto.product;

import com.industech.model.product.Image;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class ImageDetails {
    private String url;
    private String name;

    public ImageDetails(){}
    public ImageDetails(Image image){
        this.url=image.getUrl();
        this.name=image.getName();
    }

    @Override
    public String toString() {
        return "ImageDetails{" +
                "url='" + url + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
