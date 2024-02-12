package com.industech.repository;

import com.industech.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege,Integer> {

    @Query(value="SELECT new Privilege(p.id, p.name) FROM  Privilege p WHERE name in ('create','read')")
    Set<Privilege> getUserPermissions();
}
