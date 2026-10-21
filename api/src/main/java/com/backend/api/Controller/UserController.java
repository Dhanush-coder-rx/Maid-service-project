package com.backend.api.Controller;

import com.backend.api.DTO.PasswordUpdateRequest;
import com.backend.api.Enity.User;
import com.backend.api.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {


    @Autowired
    private UserRepo userRepository;



    @PostMapping("/registerUser")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            }
            userRepository.save(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }


    @PutMapping("/updatePasswordForUser")
    public ResponseEntity<String> updatePasswordForLen(@RequestBody PasswordUpdateRequest request) {
        // Validate input
        if (request.getNewPassword() == null || request.getOldPassword() == null || request.getConfirmPassword() == null) {
            return ResponseEntity.badRequest().body("Old password, new password, and confirm password are required.");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("New password and confirm password do not match.");
        }

        // Find Admin user by email
        Optional<User> optionalAdmin = userRepository.findByEmail(request.getEmail());
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.status(404).body("Admin user not found.");
        }

        User user = optionalAdmin.get();

        // Validate old password
        if (!user.getPassword().equals(request.getOldPassword())) {
            return ResponseEntity.badRequest().body("Invalid current password.");
        }

        // Update password
        user.setPassword(request.getNewPassword());
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully.");
    }
}
