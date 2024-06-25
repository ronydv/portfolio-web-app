package com.industech.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
