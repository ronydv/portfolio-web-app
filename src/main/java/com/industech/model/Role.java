package com.industech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "role")
@Entity(name = "Role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_privileges",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "role_id_fk")),
            inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "privilege_id_fk")))
    private Set<Privilege> privileges=new HashSet<>();

    public Role(String name){ this.name=name; }

    @Override
    public String toString() {
        return "Role {"+
                "\n\t\tid: "+id+
                "\n\t\trole: "+ name +
                "\n\t\tprivileges: "+privileges+
                "\n\t\t}";
    }
}


