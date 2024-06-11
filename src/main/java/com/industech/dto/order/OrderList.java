package com.industech.dto.order;

import com.industech.model.order.Order;
import lombok.Getter;
import lombok.Setter;
import java.time.format.DateTimeFormatter;

@Setter @Getter
public class OrderList {//THIS CLASS MAP THE ORDER ENTITY REGARDLESS OF THE USER
    private String userName;
    private String productName;
    private Boolean isPending;
    private Boolean isChecked;
    private String orderedAt;
    private Long total;

    public OrderList(){}
    public OrderList(Order order, Long total){
        this.userName=order.getUser().getName();
        this.productName=order.getProduct().getName();
        this.isPending=order.getIsPending();
        this.isChecked=order.getIsChecked();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        this.orderedAt=order.getOrderedAt().format(date);
        this.total=total;
    }
}
