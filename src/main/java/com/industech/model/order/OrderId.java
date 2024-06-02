package com.industech.model.order;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Setter @Getter
@Embeddable
public class OrderId implements Serializable {

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "product_id")
    private Long productId;

    public OrderId(){}
    public OrderId(Long userId, Long productId){
        this.userId=userId;
        this.productId=productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderId that = (OrderId) o;
        return Objects.equals(this.userId, that.userId) && Objects.equals(this.productId, that.productId);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((userId == null) ? 0 : userId.hashCode());
        result = prime * result
                + ((productId == null) ? 0 : productId.hashCode());
        return result;
    }
}
