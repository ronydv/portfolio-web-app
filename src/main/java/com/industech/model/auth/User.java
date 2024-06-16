package com.industech.model.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.industech.model.order.Order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.CascadeType.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name="email_unique_constraint", columnNames = {"email"} )
})
@Entity(name = "User")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "user_id_fk")),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "role_id_fk")))
    private Set<Role> roles=new HashSet<>();

    @OneToOne(mappedBy = "user", orphanRemoval = true, cascade = REMOVE)//on delete user, delete token
    private RefreshToken refreshToken;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = {PERSIST,MERGE}, orphanRemoval = true)
    private Set<Order> orders=new HashSet<>();

    public User(String name, String email, String phone, String password, Set<Role> roles ){
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.password=password;
        this.roles=roles;
    }

    public void addOrder(Order order){
        this.orders.add(order);
        order.setUser(this);
    }
    public void removeOrder(Order order){
        this.orders.remove(order);
        order.setUser(null);
    }

    @Override
    public String toString() {
        Role role= roles.stream()
                .filter(r ->
                        r.getName().equals("admin")|| r.getName().equals("user"))
                .findFirst().orElse(null);
        return "User {"+
                "\n\tid: "+id+
                "\n\temail: "+email+
                "\n\troles: "+role+
                "\n}";
    }
}
