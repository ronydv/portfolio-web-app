package com.industech.repository.auth;

import com.industech.model.auth.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege,Integer> {

}
