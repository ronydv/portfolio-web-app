package com.industech.repository.order;

import com.industech.model.order.Order;
import com.industech.model.order.OrderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, OrderId> {
}
