package com.portfolio.model.auth;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refresh_token", uniqueConstraints = {
        @UniqueConstraint(name="user_unique_constraint", columnNames = {"user_id"} )
})
@Entity(name = "RefreshToken")
public class RefreshToken {
    @Id
    @SequenceGenerator(name= "token_sequence", sequenceName= "token_id_sequence", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "token_sequence")
    private Long id;

    private String token;

    private Instant expiryDate;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",
            foreignKey = @ForeignKey(name ="user_token_fk" ))
    private User user;

    public RefreshToken(String token, Instant expiryDate, User user){
        this.token=token;
        this.expiryDate=expiryDate;
        this.user=user;
    }
    @Override
    public String toString(){
        return "refresh token {" +
                "\n\tid: "+id+
                "\n\ttoken: "+token+
                "\n\tuser: "+user.getEmail()+
                "\n}";
    }
}
