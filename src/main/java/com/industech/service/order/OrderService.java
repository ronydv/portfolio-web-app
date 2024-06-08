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

    public OrderDetails getOrdersByUser(Integer page, Integer pageSize,Long userId,
                                        Boolean sortByPending, Boolean sortByChecked ){
        Sort sort = Sort.by(sortByPending ? DESC : ASC,"isPending")
                .and(Sort.by(sortByChecked ? DESC : ASC,"isChecked"));//isPending field in Order entity
        PageRequest pages=PageRequest.of(page - 1, pageSize, sort);
        Page<Order> orders=orderRepository.findOrdersByUserId(userId,pages);
        if(orders.isEmpty()) throw new ProductException("user doesn't contain orders",HttpStatus.NOT_FOUND);
        else return new OrderDetails(orders.stream().toList(),orders.getTotalElements());
    }

    public List<OrderDetails> getOrders(Integer page, Integer pageSize,
                                        Boolean sortByPending, Boolean sortByChecked ){
        Sort sort = Sort.by(sortByPending ? DESC : ASC,"isPending")
                .and(Sort.by(sortByChecked ? DESC : ASC,"isChecked"));//isPending field in Order entity

        PageRequest pages=PageRequest.of(page - 1, pageSize, sort);
        Page<Order> paginatedOrders=orderRepository.findAll(pages);
        if(paginatedOrders.isEmpty()) throw new ProductException("empty orders!",HttpStatus.NOT_FOUND);
        else {
            List<Order>orders=paginatedOrders.getContent();
            List<Order>selectedOrders=new ArrayList<>();
            List<OrderDetails>userOrders=new ArrayList<>();
            for (int i = 0; i < orders.size(); i++) {
                String currentName = orders.get(i).getUser().getName();
                selectedOrders.add(orders.get(i));
                if (i == (orders.size() - 1) || !currentName.equals(orders.get(i+1).getUser().getName())) {
                    userOrders.add(new OrderDetails(selectedOrders, paginatedOrders.getTotalElements()));
                    selectedOrders=new ArrayList<>();
                }
            }
            return userOrders;
        }
    }

}




/*    public List<String> getOrders(Integer page, Integer pageSize,
                                  Boolean sortByPending, Boolean sortByChecked ){
        Sort sort = Sort.by(sortByPending ? DESC : ASC,"isPending")
                .and(Sort.by(sortByChecked ? DESC : ASC,"isChecked"));//isPending field in Order entity

        PageRequest pages=PageRequest.of(page - 1, pageSize, sort);
        Page<Order> orders=orderRepository.findAll(pages);
        if(orders.isEmpty()) throw new ProductException("empty orders!",HttpStatus.NOT_FOUND);
        else {
            return null;
        }
    }*/
