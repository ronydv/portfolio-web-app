package com.industech.dto.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.industech.model.product.Image;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class ImageDetails {
    private String url;
    private String name;

    @JsonIgnore private String publicId;

    public ImageDetails(){}
    public ImageDetails(Image image){//constructor to use as dto to send to the controller
        this.url=image.getUrl();
        this.name=image.getName();
    }
    public ImageDetails(String url, String publicId ){//constructor to use as dto to use in the ImageService
        this.url=url;
        this.publicId=publicId;
    }

    @Override
    public String toString() {
        return "ImageDetails{" +
                "url='" + url + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
