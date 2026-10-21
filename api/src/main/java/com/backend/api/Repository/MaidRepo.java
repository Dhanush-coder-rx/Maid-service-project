package com.backend.api.Repository;

import com.backend.api.Enity.Maid;
import com.backend.api.Enity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaidRepo extends JpaRepository <Maid ,Integer> {

    Optional<Maid> findByEmail(String email);

    boolean existsByEmail(String email);


}
