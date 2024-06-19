package com.industech.service.order;

import com.industech.dto.order.OrderDetails;
import com.industech.dto.order.OrderView;
import com.industech.exception.AuthUserException;
import com.industech.exception.ProductException;
import com.industech.model.auth.User;
import com.industech.model.order.Order;
import com.industech.model.product.Product;
import com.industech.repository.auth.UserRepository;
import com.industech.repository.order.OrderRepository;
import com.industech.repository.product.ProductRepository;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
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

    public List<OrderView> getPendingOrders(Integer page, Integer pageSize,
                                            Boolean sortByPending, Boolean sortByChecked ){
        Sort sort = Sort.by(sortByPending ? DESC : ASC,"isPending")
                .and(Sort.by(sortByChecked ? DESC : ASC,"isChecked"));//isPending field in Order entity

        PageRequest pages=PageRequest.of(page - 1, pageSize, sort);
        Page<Order> paginatedOrders=orderRepository.findByPendingOrders(pages);
        if(paginatedOrders.isEmpty()) throw new ProductException("empty orders!",HttpStatus.NOT_FOUND);
        else {
            return paginatedOrders.getContent().stream()
                    .map(order -> new OrderView(order,paginatedOrders.getTotalElements())).toList();
        }
    }

    public OrderView updateOrder(OrderView order){
        if(order == null) throw new ProductException("Empty order", HttpStatus.BAD_REQUEST);
        Order toUpdate=orderRepository.getReferenceById(order.getOrderId());
        toUpdate.setIsPending(order.getIsPending());
        toUpdate.setIsChecked(order.getIsChecked());
        return new OrderView(orderRepository.save(toUpdate));
    }

    public Long uncheckedOrders(){
        return orderRepository.countUncheckedOrders();
    }

    public String deleteOrder(Long orderId){
        return orderRepository.findById(orderId)
                .map(order ->{
                    orderRepository.delete(order);
                    return "deleted successfully";
                }).orElseGet(()->{
                    log.error("\u001B[35mOrder to delete doesn't exists\u001B[0m");
                    throw new AuthUserException("Order to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }
}
