package com.portfolio.repository.product;

import com.portfolio.model.product.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SectorRepository extends JpaRepository<Sector,Integer> {

    @Query("SELECT s FROM Sector s WHERE s.name = :name")
    Optional<Sector> findSectorByName(@Param("name")String name);
}
