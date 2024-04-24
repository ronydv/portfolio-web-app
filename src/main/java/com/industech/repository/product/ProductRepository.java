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
public interface ProductRepository extends JpaRepository<Product,Integer> {

    //load product and its related records when fetch=LAZY is used in the associated entities
    // JOIN FETCH p.images may load duplicates entries, use Set<> to avoid duplicates
    // use always LEFT JOIN FETCH in case the associated records are empty to avoid exceptions when retrieving data
    @Query(value= """
            SELECT p FROM Product p LEFT JOIN FETCH p.productCategories
                                   LEFT JOIN FETCH p.images WHERE p.id = :id
            """)
    Optional<Product> findById(@Param("id") Integer id);

    @Query(value = """
            SELECT * FROM product WHERE name ~ (:regex)
                              OR description ~ (:regex)
            """, nativeQuery = true)
    Page<Product> searchProducts(@Param("regex") String regex, Pageable pages);

/*    @Query(value = """
            SELECT p FROM Product p  WHERE ??
            """)
    Page<Product> findDesigns(Pageable pages);*/

/*    @Query(value = """
            SELECT p FROM Product p  WHERE ??
            """)
    Page<Product> findAutomations(Pageable pages);*/

    /*    @Query(value = """
            SELECT p FROM Product p  WHERE ??
            """)
    Page<Product> findMachines(Pageable pages);*/
}
