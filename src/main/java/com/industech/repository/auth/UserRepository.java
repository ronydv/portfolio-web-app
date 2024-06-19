package com.industech.repository.auth;

import com.industech.model.auth.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    @Query(value = """
            SELECT * FROM users WHERE email ~ (:regex)
                                    OR name ~ (:regex)
                                   OR phone ~ (:regex)
            """, nativeQuery = true)
    Page<User> searchByKeywords(@Param("regex") String regex, Pageable pages);
}
