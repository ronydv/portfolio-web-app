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

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name="user_id_fk"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name="product_id_fk"))
    private Product product;

    private Boolean isPending=true;

    private LocalDateTime orderedAt=LocalDateTime.now();

    public Order(){}
    public Order(User user, Product product){
        this.user=user;
        this.product=product;
    }

    @Override
    public String toString() {
        DateTimeFormatter date = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return "Order by: "+user.getName()+", is pending?: "+isPending+", ordered at: "+orderedAt.format(date)+"\n";
    }
}
