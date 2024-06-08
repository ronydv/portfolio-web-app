package com.industech.controller.order;

import com.industech.dto.order.OrderDetails;
import com.industech.model.order.Order;
import com.industech.service.order.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {this.orderService = orderService;}

    @PostMapping("/order")
    public ResponseEntity<OrderDetails> saveOrder(@RequestBody OrderDetails order){
        return new ResponseEntity<>(orderService.saveOrder( order.getUserId(),order.getProductIds() ),OK);
    }

    @GetMapping("/order")//endpoint for users
    public ResponseEntity<OrderDetails> getOrdersByUser( @RequestParam("page") Integer page,
                                                         @RequestParam("page-size") Integer pageSize,
                                                         @RequestParam("user-id") Long userId,
                                                         @RequestParam("sort-pending") Boolean sortPending,
                                                         @RequestParam("sort-checked") Boolean sortChecked) {
        OrderDetails orders= orderService.getOrdersByUser(page, pageSize, userId,sortPending, sortChecked );
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @GetMapping("/order/all")//endpoint for admin
    public ResponseEntity<List<OrderDetails>> getOrders( @RequestParam("page") Integer page,
                                                         @RequestParam("page-size") Integer pageSize,
                                                         @RequestParam("sort-pending") Boolean sortPending,
                                                         @RequestParam("sort-checked") Boolean sortChecked) {
        List<OrderDetails> orders= orderService.getOrders(page, pageSize,sortPending, sortChecked );
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}