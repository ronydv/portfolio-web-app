package com.industech.repository.order;

import com.industech.model.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {//replaced UserId by Long

    @Query(value= """
            SELECT o FROM Order o WHERE o.user.id = :id
            """)
    Page<Order> findOrdersByUserId(@Param("id") Long id, Pageable pages);

    @Query(value= """
            SELECT o FROM Order o WHERE o.isPending=TRUE
            """)
    Page<Order> findByPendingOrders(Pageable pages);
}
