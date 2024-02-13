package com.industech.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Entity(name = "User")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;//todo: change strategy

    private String name;

    private String email;//todo: set unique

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "user_id_fk")),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "role_id_fk")))
    private Set<Role> roles=new HashSet<>();

    public User(String name, String email, String password, Set<Role> roles ){
        this.name=name;
        this.email=email;
        this.password=password;
        this.roles=roles;
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
