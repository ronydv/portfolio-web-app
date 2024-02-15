package com.industech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

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

    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private UUID uuid = UUID.randomUUID();

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",
            foreignKey = @ForeignKey(name ="user_token_fk" ))
    private User user;

    @Override
    public String toString(){
        return "refresh token {" +
                "\n\tid: "+id+
                "\n\ttoken: "+token+
                "\n\tuser: "+user.getEmail()+
                "\n}";
    }
}
