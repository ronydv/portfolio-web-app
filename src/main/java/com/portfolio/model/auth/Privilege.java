package com.portfolio.model.auth;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "privilege")
@Entity(name = "Privilege")
public class Privilege {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;

    public Privilege(String name){ this.name = name; }

    @Override
    public String toString() {
        return "\n\t\t\tPrivilege { id: "+id+" privilege: "+ name + " }";
    }

}
