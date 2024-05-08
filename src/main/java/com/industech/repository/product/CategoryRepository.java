package com.industech.repository.product;

import com.industech.model.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByName(String name);

    @Query("""
            SELECT DISTINCT c FROM Product p JOIN p.sectors s
                                             JOIN p.productCategories pc
                                             JOIN pc.category c
                                                WHERE s.name = :sector
                """)
    List<Category> findCategoriesBySector(@Param("sector") String sector);
}
