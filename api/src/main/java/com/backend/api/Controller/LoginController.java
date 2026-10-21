package com.backend.api.Controller;


import com.backend.api.Repository.AdminRepo;
import com.backend.api.Repository.MaidRepo;
import com.backend.api.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private AdminRepo adminRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private MaidRepo maidRepo;



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            String usertype = loginData.get("usertype");

            if (usertype == null || email == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields");
            }

            if (usertype.equalsIgnoreCase("User")) {
                var user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                if (user.getPassword().equals(password)) {
                    return ResponseEntity.ok("User");
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            else if (usertype.equalsIgnoreCase("Maid")) {
                var maid = maidRepo.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Maid not found"));

                if (maid.getPassword().equals(password)) {
                    return ResponseEntity.ok("Maid");
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            else if (usertype.equalsIgnoreCase("Admin")) {
                var admin = adminRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Admin not found"));

                if (admin.getPassword().equals(password)) {
                    return ResponseEntity.ok("Admin");
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type");
            }

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
