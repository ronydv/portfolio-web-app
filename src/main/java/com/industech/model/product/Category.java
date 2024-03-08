package com.industech.model.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "category")
@Entity
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String category;


    public String toString(){
        return "{"+
                "\n\t\tcategory: "+ category +"\n"+
                "\t}";
    }
}
