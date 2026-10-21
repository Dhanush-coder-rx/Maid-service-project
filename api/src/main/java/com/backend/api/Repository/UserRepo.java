package com.backend.api.Repository;

import com.backend.api.Enity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository <User , Integer> {

    Optional<User> findByEmail(String email);



    boolean existsByEmail(String email);
}
