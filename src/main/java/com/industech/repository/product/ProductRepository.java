package com.industech.repository.product;

import com.industech.model.product.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    //load product and its related records when fetch=LAZY is used in the associated entities
    // JOIN FETCH p.images may load duplicates entries, use Set<> to avoid duplicates
    // use always LEFT JOIN FETCH in case the associated records are empty to avoid exceptions when retrieving data
    @Query(value= """
            SELECT p FROM Product p LEFT JOIN FETCH p.productCategories
                                    LEFT JOIN FETCH p.images WHERE p.id = :id
            """)
    Optional<Product> findById(@Param("id") Long id);

/*    @Query(value= """
            SELECT p FROM Product p LEFT JOIN FETCH p.productCategories
                                    LEFT JOIN FETCH p.images
                                    LEFT JOIN FETCH p.orders WHERE p.id = :id
            """)
    Optional<Product> findByIdWithOrders(@Param("id") Long id);*/

    @Query(value = """
            SELECT * FROM product WHERE name ~ (:regex)
                              OR description ~ (:regex)
            """, nativeQuery = true)
    Page<Product> searchProducts(@Param("regex") String regex, Pageable pages);

    @Query(value= """
            SELECT COUNT(p.id) FROM Product p INNER JOIN p.sectors s
                                                   WHERE s.name = :sector
            """)
    Optional<Long> getTotalBySector(@Param("sector") String sector);


    @Query("""
        SELECT DISTINCT p FROM Product p JOIN p.sectors s
                                         LEFT JOIN FETCH p.productCategories pc
                                         LEFT JOIN pc.category c
                                         LEFT JOIN p.types t
                                            WHERE s.name = :sector
                                            AND (:categories IS NULL OR c.name IN :categories)
                                            AND (:types IS NULL OR t.productType IN :types)
        """)
    List<Product> findProductsBySectorCategoriesAndTypes(@Param("sector") String sector,
                                                         @Param("categories") List<String> categories,
                                                         @Param("types") List<String> types);



}
