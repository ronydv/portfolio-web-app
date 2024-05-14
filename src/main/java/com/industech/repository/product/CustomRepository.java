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

        String countRecords = """
                   SELECT COUNT(p.id) FROM Product p
                        LEFT JOIN p.sectors s
                            WHERE s.name = :sector
        """;
        Query queryAmount=entityManager.createQuery(countRecords,Long.class)
                .setParameter("sector",sector);
        long total=(long)queryAmount.getSingleResult();
        return new ProductsBySector(new ArrayList<Product>(queryProducts.getResultList()),total);
    }

    public ProductsBySector findProductsByCategoriesAndTypes(String sector,
                                                             List<String>categories,
                                                             List<String>types,
                                                             Pageable pageRequest) {
        String productsByCategoriesAndTypes = """
            SELECT DISTINCT p.id FROM Product p LEFT JOIN p.sectors s
                                   LEFT JOIN p.productCategories pc
                                   LEFT JOIN pc.category c
                                   LEFT JOIN p.types t
                                        WHERE s.name = :sector
                                          AND (COALESCE(:categories) IS NULL OR c.name IN :categories)
                                          AND (COALESCE(:types) IS NULL OR t.productType IN :types)
            """;
        Query queryIds = entityManager.createQuery(productsByCategoriesAndTypes, Integer.class)
                .setParameter("sector",sector)
                .setParameter("categories",categories)
                .setParameter("types",types);
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

        String countRecords = """
            SELECT COUNT(DISTINCT p.id) FROM Product p LEFT JOIN p.sectors s
                                   LEFT JOIN p.productCategories pc
                                   LEFT JOIN pc.category c
                                   LEFT JOIN p.types t
                                        WHERE s.name = :sector
                                          AND (COALESCE(:categories) IS NULL OR c.name IN :categories)
                                          AND (COALESCE(:types) IS NULL OR t.productType IN :types)
            """;
        Query queryAmount=entityManager.createQuery(countRecords,Long.class)
                .setParameter("sector",sector)
                .setParameter("categories",categories)
                .setParameter("types",types);
        long total=(long)queryAmount.getSingleResult();
        return new ProductsBySector(new ArrayList<Product>(queryProducts.getResultList()),total);
    }
}
