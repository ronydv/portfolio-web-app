package com.industech.controller.order;

import com.industech.dto.order.OrderDetails;
import com.industech.model.order.Order;
import com.industech.service.order.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}