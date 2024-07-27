package com.portfolio.model.product;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Table(name = "sector")
@Entity
public class Sector {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    public Sector(){}
    public Sector(String name){ this.name=name; }

    @Override
    public String toString() {
        return "sector: "+this.name;
    }
}
