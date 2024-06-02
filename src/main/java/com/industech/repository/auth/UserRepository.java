package com.industech.repository.auth;

import com.industech.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

/*    @Query(value= """
            SELECT u FROM User u LEFT JOIN FETCH u.orders
                                           WHERE u.id = :id
            """)
    Optional<User> findWithOrdersById(@Param("id") Long id);*/
}
