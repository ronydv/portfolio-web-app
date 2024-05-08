package com.industech.repository.product;

import com.industech.model.product.Product;
import com.industech.model.product.Sector;
import com.industech.model.product.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TypeRepository extends JpaRepository<Type,Integer> {

    @Query("SELECT t FROM Type t WHERE t.productType = :name")
    Optional<Type> findTypeByName(@Param("name")String name);

    @Query(value= """
            SELECT t FROM Type t LEFT JOIN FETCH t.products
                                           WHERE t.id = :id
            """)
    Optional<Type> findTypeById(@Param("id") Integer id);

    @Query("""
            SELECT DISTINCT t FROM Product p JOIN p.sectors s JOIN p.types t
                                            WHERE s.name = :sector
            """)
    List<Type> findTypesBySector(@Param("sector") String sector);
}
