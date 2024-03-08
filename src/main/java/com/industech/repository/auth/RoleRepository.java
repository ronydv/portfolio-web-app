package com.industech.repository.auth;

import com.industech.model.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {

    @Query("SELECT r FROM  Role r WHERE r.name=?1")
    Optional<Role> findByRoleName(String role);
}
