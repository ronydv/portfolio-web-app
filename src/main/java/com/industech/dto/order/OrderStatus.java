package com.industech.dto.order;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class OrderStatus {
    Long totalOrders;
    Long pendingOrders;
    Long nonPendingOrders;

    public OrderStatus(Long totalOrders, Long pendingOrders, Long nonPendingOrders){
        this.totalOrders=totalOrders;
        this.pendingOrders=pendingOrders;
        this.nonPendingOrders=nonPendingOrders;
    }

    @Override
    public String toString() {
        return "OrderStatus{" +
                "totalOrders=" + totalOrders +
                ", pendingOrders=" + pendingOrders +
                ", nonPendingOrders=" + nonPendingOrders +
                '}';
    }
}
