package com.industech.repository.product;

import com.industech.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    /*use this method only if product with categories is needed*/
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.categories WHERE p.id = :productId")
    Optional<Product> getProductWithCategories(@Param("productId") Integer productId);
}
