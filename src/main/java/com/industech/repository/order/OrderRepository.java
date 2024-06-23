package com.industech.repository.order;

import com.industech.dto.order.OrderCount;
import com.industech.dto.order.OrderStatus;
import com.industech.model.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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


    @Query("""
            SELECT new com.industech.dto.order.OrderStatus(
                COUNT(o),
                SUM(CASE WHEN o.isPending = TRUE THEN 1 ELSE 0 END),
                SUM(CASE WHEN o.isPending = FALSE THEN 1 ELSE 0 END),
                SUM(CASE WHEN o.isChecked = TRUE THEN 1 ELSE 0 END),
                SUM(CASE WHEN o.isChecked = FALSE THEN 1 ELSE 0 END)
            )
            FROM Order o
            """)
    OrderStatus countTotalAndStatuses();


    @Query("""
            SELECT new com.industech.dto.order.OrderCount(
                p.name,
                COUNT(o)
            )
            FROM Order o
            JOIN o.product p
            JOIN p.sectors s
            WHERE s.name = :sectorName
            GROUP BY p.name
            ORDER BY COUNT(o) DESC
           """)
    Page<OrderCount> getTopOrdersBySector(@Param("sectorName") String sectorName, Pageable pages);

    @Query("""
            SELECT new com.industech.dto.order.OrderCount(
                p.name,
                COUNT(o)
            )
            FROM Order o
            JOIN o.product p
            JOIN p.sectors s
            GROUP BY p.name
            ORDER BY COUNT(o) DESC
           """)
    Page<OrderCount> getTopOrders(Pageable pages);
}
