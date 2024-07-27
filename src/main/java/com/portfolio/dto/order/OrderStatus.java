package com.portfolio.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class OrderStatus {
    private Long totalOrders;
    private Long pendingOrders;
    private Long nonPendingOrders;
    private Long checkedOrders;
    private Long uncheckedOrders;
    private List<OrderStatusDataName> dataForStatistics;

    public OrderStatus(Long totalOrders, Long pendingOrders,
                       Long nonPendingOrders, Long checkedOrders, Long uncheckedOrders){
        this.totalOrders=totalOrders;
        this.pendingOrders=pendingOrders;
        this.nonPendingOrders=nonPendingOrders;
        this.checkedOrders=checkedOrders;
        this.uncheckedOrders=uncheckedOrders;
        this.dataForStatistics=dataForStatistics();
    }

    @Setter @Getter
    static class OrderStatusDataName{
        String dataName;
        Long value;
        OrderStatusDataName(String dataName, Long value){
            this.dataName=dataName;
            this.value=value;
        }
    }
    public List<OrderStatusDataName>dataForStatistics(){
        return List.of(
                new OrderStatusDataName("Pendiente",pendingOrders),
                new OrderStatusDataName("No Pendiente",nonPendingOrders),
                new OrderStatusDataName("Checkeado",checkedOrders),
                new OrderStatusDataName("No Checkeado",uncheckedOrders)
        );
    }

    @Override
    public String toString() {
        return "OrderStatus{" +
                "totalOrders=" + totalOrders +
                ", pendingOrders=" + pendingOrders +
                ", nonPendingOrders=" + nonPendingOrders +
                ", checkedOrders=" + checkedOrders +
                ", uncheckedOrders=" + uncheckedOrders +
                '}';
    }
}
