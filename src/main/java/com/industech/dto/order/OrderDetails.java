package com.industech.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.industech.model.order.Order;
import lombok.Getter;
import lombok.Setter;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Setter @Getter
public class OrderDetails {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;
    private String userName;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Long> productIds;
    private List<OrderedProduct>orderedProducts;

    public OrderDetails(){}
    public OrderDetails(List<Order>orders){
        if(!orders.isEmpty()){
            this.userId=orders.stream().map(order -> order.getUser().getId()).findFirst().get();
            this.userName=orders.stream().map(order -> order.getUser().getName()).findFirst().get();
            this.orderedProducts=orders.stream().map(OrderedProduct::new).toList();
        }
    }
    @Setter @Getter
    private static class OrderedProduct{
        private String productName;
        private Boolean isPending;
        private String orderedAt;

        OrderedProduct(Order order){
            this.productName=order.getProduct().getName();
            this.isPending =order.getIsPending();
            DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            this.orderedAt=order.getOrderedAt().format(date);
        }

        @Override
        public String toString() {
            return "\n\tProduct{" +
                    "product name='" + productName + '\'' +
                    ", is pending=" + isPending +
                    ", ordered at='" + orderedAt + '\'' +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "OrderDetails{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", productIds=" + productIds +
                ", orderedProducts=" + orderedProducts +
                '}';
    }
}
