package com.industech.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.industech.model.order.Order;
import lombok.Getter;
import lombok.Setter;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Setter @Getter
public class OrderDetails {//THIS CLASS MAP THE ORDER ENTITY BY USER AND ITS ORDERS

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;//input from the frontend
    private String userName;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Long> productIds;//inputs from the frontend
    private List<OrderedProduct>orderedProducts;
    private Long total;

    public OrderDetails(){}
    public OrderDetails(List<Order>orders){
        if(!orders.isEmpty()){
            this.userId=orders.stream().map(order -> order.getUser().getId()).findFirst().get();
            this.userName=orders.stream().map(order -> order.getUser().getName()).findFirst().get();
            this.orderedProducts=orders.stream().map(OrderedProduct::new).toList();
        }
    }
    public OrderDetails(List<Order>orders,Long total){
        if(!orders.isEmpty()){
            this.userId=orders.stream().map(order -> order.getUser().getId()).findFirst().get();
            this.userName=orders.stream().map(order -> order.getUser().getName()).findFirst().get();
            this.orderedProducts=orders.stream().map(OrderedProduct::new).toList();
            this.total=total;
        }
    }
    @Setter @Getter
    private static class OrderedProduct{
        private Long orderId;
        private String productName;
        private Boolean isPending;
        private String orderedAt;
        private Boolean isChecked;

        OrderedProduct(Order order){
            this.orderId=order.getId();
            this.productName=order.getProduct().getName();
            this.isPending =order.getIsPending();
            DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            this.orderedAt=order.getOrderedAt().format(date);
            this.isChecked=order.getIsChecked();
        }

        @Override
        public String toString() {
            return "\n\tProduct{" +
                    "product name='" + productName + '\'' +
                    ", is pending=" + isPending +
                    ", ordered at='" + orderedAt + '\'' +
                    ", is checked='" + isChecked + '\'' +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "OrderDetails{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", orderedProducts=" + orderedProducts +
                '}';
    }
}
