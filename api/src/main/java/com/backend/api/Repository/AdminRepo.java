package com.backend.api.Repository;

import com.backend.api.Enity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin ,Integer> {

    Optional<Admin> findByEmail(String email);
}
