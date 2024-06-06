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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;

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

    public OrderDetails getOrdersByUser(Integer page, Integer pageSize,Boolean isDesc, Long userId){
        Sort sortByPendingASC = Sort.by(isDesc ? DESC : ASC,"isPending");//isPending field in Order entity
        PageRequest pages=PageRequest.of(page - 1, pageSize, sortByPendingASC);
        Page<Order> orders=orderRepository.findByUserId(userId,pages);
        if(orders.isEmpty()) throw new ProductException("user doesn't contain orders",HttpStatus.NOT_FOUND);
        else return new OrderDetails(orders.stream().toList());
    }

}
