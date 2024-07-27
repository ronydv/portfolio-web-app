package com.portfolio.dto.order;

import com.portfolio.model.order.Order;
import lombok.Getter;
import lombok.Setter;
import java.time.format.DateTimeFormatter;

@Setter @Getter
public class OrderView {//THIS CLASS MAP THE ORDER ENTITY REGARDLESS OF THE USER
    private Long orderId;
    private String userName;
    private String productName;
    private Boolean isPending;
    private Boolean isChecked;
    private String orderedAt;
    private Long total;

    public OrderView(){}
    public OrderView(Order order){
        this.orderId=order.getId();
        this.userName=order.getUser().getName();
        this.productName=order.getProduct().getName();
        this.isPending=order.getIsPending();
        this.isChecked=order.getIsChecked();
    }
    public OrderView(Order order, Long total){
        this.orderId=order.getId();
        this.userName=order.getUser().getName();
        this.productName=order.getProduct().getName();
        this.isPending=order.getIsPending();
        this.isChecked=order.getIsChecked();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        this.orderedAt=order.getOrderedAt().format(date);
        this.total=total;
    }
}
