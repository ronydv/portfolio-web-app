package com.industech.dto.product;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class ImageDetails {
    private String url;
    private String name;

    public ImageDetails(){}
    public ImageDetails(String url, String name){
        this.url=url;
        this.name=name;
    }
}
