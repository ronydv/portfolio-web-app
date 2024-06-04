package com.industech.service.order;

import com.industech.dto.order.OrderDetails;
import com.industech.exception.AuthUserException;
import com.industech.exception.ProductException;
import com.industech.model.auth.User;
import com.industech.model.order.Order;
import com.industech.model.product.Product;
import com.industech.repository.auth.UserRepository;
import com.industech.repository.order.OrderRepository;
import com.industech.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private OrderRepository orderRepository;

    public OrderDetails saveOrder(Long userId, List<Long> productIds){
        User user=userRepository.findById(userId)
                .orElseThrow(()-> new AuthUserException("user not found", HttpStatus.NOT_FOUND));
        List<Order>orders=new ArrayList<>();
        for(Long productId:productIds){
            Product product= productRepository.findById(productId)
                    .orElseThrow(()-> new ProductException("product not found",HttpStatus.NOT_FOUND));
            orders.add(new Order(user,product));
        }
        return new OrderDetails(orderRepository.saveAll(orders));
    }

}
