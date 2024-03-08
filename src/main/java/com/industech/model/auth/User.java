package com.industech.model.auth;

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
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name="email_unique_constraint", columnNames = {"email"} )
})
@Entity(name = "User")
public class User {
    @Id
    @SequenceGenerator(name= "user_sequence", sequenceName= "user_id_sequence", allocationSize=1 )//auto-increment by 1
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    private String name;

    @Column(nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "user_id_fk")),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "role_id_fk")))
    private Set<Role> roles=new HashSet<>();

    @OneToOne(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)//on delete user, delete token
    private RefreshToken refreshToken;

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
