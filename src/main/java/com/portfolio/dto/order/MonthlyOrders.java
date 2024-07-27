package com.portfolio.dto.order;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class MonthlyOrders {
    private Long amount;

    public MonthlyOrders(){}
    public MonthlyOrders( Long amount){
        this.amount=amount;
    }

    @Override
    public String toString() {
        return "MonthlyOrders{" +
                "amount='" + amount + '\'' +
                '}';
    }
}
