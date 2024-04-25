package com.industech.repository.product;

import com.industech.dto.product.ProductsBySector;
import com.industech.model.product.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public ProductsBySector findProductsBySector(String sector, Pageable pageRequest) {
        String productsBySector = """
                    SELECT p.id FROM Product p
                        LEFT JOIN p.sectors s
                            WHERE s.name = :sector
            """;
        Query queryIds = entityManager.createQuery(productsBySector, Integer.class)
                .setParameter("sector", sector);
        String countRecords = """
                   SELECT COUNT(p.id) FROM Product p
                        LEFT JOIN p.sectors s
                            WHERE s.name = :sector
        """;
        Query queryAmount=entityManager.createQuery(countRecords,Long.class)
                .setParameter("sector",sector);
        long total=(long)queryAmount.getSingleResult();
        int pageNumber =pageRequest.getPageNumber();
        int pageSize = pageRequest.getPageSize();
        queryIds.setFirstResult((pageNumber) * pageSize);
        queryIds.setMaxResults(pageSize);

        List<Long> productIds=queryIds.getResultList();
        String products = """
                    SELECT p FROM Product p
                        LEFT JOIN FETCH p.productCategories
                        LEFT JOIN FETCH p.images
                            WHERE p.id IN :productIds
        """;
        Query queryProducts=entityManager.createQuery(products,Product.class)
                .setParameter("productIds",productIds);
        return new ProductsBySector(new ArrayList<Product>(queryProducts.getResultList()),total);
    }
}
