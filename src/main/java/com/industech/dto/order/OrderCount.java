package com.industech.dto.order;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class OrderCount {//DTO to show top most ordered products in a pie chart
    private String productName;
    private Long value;

    public OrderCount(){}
    public OrderCount(String productName, Long value){
        this.productName= productName;
        this.value= value;
    }

    @Override
    public String toString() {
        return "OrderCount{" +
                "productName='" + productName + '\'' +
                ", value=" + value +
                '}';
    }
}
