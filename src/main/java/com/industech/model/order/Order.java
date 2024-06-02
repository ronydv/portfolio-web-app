package com.industech.model.order;

import com.industech.model.auth.User;
import com.industech.model.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Setter @Getter
@Table(name = "orders")
@Entity
public class Order {

    @EmbeddedId
    private OrderId id;

    @ManyToOne @MapsId("userId")//this comes from OrderId instance field
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name="user_id_fk"))
    private User user;

    @ManyToOne @MapsId("productId")
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name="product_id_fk"))
    private Product product;

    private Boolean isPending=true;

    private LocalDateTime orderedAt=LocalDateTime.now();

    public Order(){}
    public Order(OrderId id, User user, Product product){
        this.id=id;
        this.user=user;
        this.product=product;
    }

    public static Order add(User user, Product product){
        OrderId embeddedId= new OrderId(user.getId(),product.getId());
        return new Order(embeddedId,user,product);
    }

    @Override
    public String toString() {
        DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return "Order by: "+user.getName()+", is pending?: "+isPending+", ordered at: "+orderedAt.format(date)+"\n";
    }
}
