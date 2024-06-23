package com.industech.controller.order;

import com.industech.dto.order.OrderCount;
import com.industech.dto.order.OrdersByUser;
import com.industech.dto.order.OrderStatus;
import com.industech.dto.order.OrderView;
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
    public ResponseEntity<OrdersByUser> saveOrder(@RequestBody OrdersByUser order){
        return new ResponseEntity<>(orderService.saveOrder( order.getUserId(),order.getProductIds() ),OK);
    }

    @GetMapping("/order")//endpoint for users
    public ResponseEntity<OrdersByUser> getOrdersByUser(@RequestParam("page") Integer page,
                                                        @RequestParam("page-size") Integer pageSize,
                                                        @RequestParam("user-id") Long userId,
                                                        @RequestParam("sort-pending") Boolean sortPending,
                                                        @RequestParam("sort-checked") Boolean sortChecked) {
        OrdersByUser orders= orderService.getOrdersByUser(page, pageSize, userId,sortPending, sortChecked );
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @GetMapping("/order/all")//endpoint for admin
    public ResponseEntity<List<OrderView>> getOrders(@RequestParam("page") Integer page,
                                                     @RequestParam("page-size") Integer pageSize,
                                                     @RequestParam("sort-pending") Boolean sortPending,
                                                     @RequestParam("sort-checked") Boolean sortChecked) {
        List<OrderView> orders= orderService.getPendingOrders(page, pageSize,sortPending, sortChecked );
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order")//endpoint for admin
    public ResponseEntity<OrderView> updateOrder(@RequestBody OrderView order) {
        return new ResponseEntity<>(orderService.updateOrder(order), HttpStatus.OK);
    }
    @GetMapping("/order/status")//endpoint for admin
    public ResponseEntity<OrderStatus> uncheckedOrders() {
        return new ResponseEntity<>(orderService.getOrderStatuses(), HttpStatus.OK);
    }

    @GetMapping("/order/top-products")//endpoint for admin
    public ResponseEntity<List<OrderCount>> uncheckedOrders(@RequestParam("dataset-size") Integer datasetSize,
                                                            @RequestParam("sector") String sector) {
        return new ResponseEntity<>(orderService.getTopOrders(datasetSize, sector), HttpStatus.OK);
    }

    @DeleteMapping("/order/{id}")//endpoint for admin
    public ResponseEntity<String> deleteOrder(@PathVariable("id") Long id) {
        return new ResponseEntity<>(orderService.deleteOrder(id), HttpStatus.OK);
    }
}