package com.backend.api.Controller;


import com.backend.api.Enity.Maid;
import com.backend.api.Enity.User;
import com.backend.api.Repository.MaidRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MaidController {

    @Autowired
    private MaidRepo maidRepository;



    @PostMapping("/registerMaid")
    public ResponseEntity<String> registerUser(@RequestBody Maid maid) {
        try {
            if (maidRepository.existsByEmail(maid.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            }
            maidRepository.save(maid);
            return ResponseEntity.ok("Maid registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    @GetMapping("/getAllMaid")
    public ResponseEntity<List<Maid>> getAllMaids() {
        List<Maid> maids = maidRepository.findAll();
        return ResponseEntity.ok(maids);
    }
}
