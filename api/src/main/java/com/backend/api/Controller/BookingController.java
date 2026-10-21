package com.backend.api.Controller;


import com.backend.api.DTO.BookingDTO;
import com.backend.api.Enity.Booking;
import com.backend.api.Enity.Maid;
import com.backend.api.Enity.User;
import com.backend.api.Repository.BookingRepository;
import com.backend.api.Repository.MaidRepo;
import com.backend.api.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class BookingController {

     @Autowired
     private BookingRepository bookingRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private MaidRepo maidRepo;



    @PostMapping("/bookService")
    public ResponseEntity<String> bookService(@RequestBody BookingDTO bookingDTO) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(bookingDTO.getEmail());
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            Booking booking = new Booking();
            booking.setUser(userOptional.get()); // Get the actual User object
            booking.setMaidservice(bookingDTO.getMaidservice());
            booking.setArea(bookingDTO.getArea());
            booking.setDate(bookingDTO.getDate());

            bookingRepository.save(booking);
            return ResponseEntity.ok("Booking created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating booking");
        }
    }


    @GetMapping("/getByUser/{email}")
    public ResponseEntity<?> getBookingsByUserEmail(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Booking> bookings = bookingRepository.findByUser(userOptional.get());
        if (bookings.isEmpty()) {
            return ResponseEntity.ok("No bookings found for this user");
        }

        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/getUnassigned")
    public ResponseEntity<?> getAllUnassignedBookings() {
        List<Booking> unassignedBookings = bookingRepository.findAllUnassignedBookings();

        if (unassignedBookings.isEmpty()) {
            return ResponseEntity.ok("No unassigned bookings found");
        }

        return ResponseEntity.ok(unassignedBookings);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateBooking(@PathVariable int id, @RequestBody BookingDTO bookingDTO) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);

        if (!optionalBooking.isPresent()) {
            return ResponseEntity.badRequest().body("Booking not found");
        }

        Booking booking = optionalBooking.get();

        // If email is provided, update user
        if (bookingDTO.getEmail() != null) {
            Optional<User> userOptional = userRepository.findByEmail(bookingDTO.getEmail());
            if (userOptional.isPresent()) {
                booking.setUser(userOptional.get());
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        }

        // Update other fields
        if (bookingDTO.getMaidservice() != null) {
            booking.setMaidservice(bookingDTO.getMaidservice());
        }
        if (bookingDTO.getArea() != null) {
            booking.setArea(bookingDTO.getArea());
        }
        if (bookingDTO.getDate() != null) {
            booking.setDate(bookingDTO.getDate());
        }

        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking updated successfully");
    }




    @PutMapping("/assignMaid/{bookingId}/{maidId}")
    public ResponseEntity<?> assignMaidToBooking(@PathVariable int bookingId, @PathVariable int maidId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        Optional<Maid> maidOptional = maidRepo.findById(maidId);

        if (!bookingOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Booking not found");
        }

        if (!maidOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Maid not found");
        }

        Booking booking = bookingOptional.get();
        Maid maid = maidOptional.get();

        // Check if the maid is already assigned to a booking on the same date
        boolean isMaidAlreadyAssigned = bookingRepository.existsByMaidAndDate(maid, booking.getDate());

        if (isMaidAlreadyAssigned) {
            return ResponseEntity.badRequest().body("Maid is already assigned to another booking on this date");
        }

        // Assign maid if not already booked
        booking.setMaid(maid);
        bookingRepository.save(booking);

        return ResponseEntity.ok("Maid assigned successfully");
    }


    @GetMapping("/getAssignedBookings/{email}")
    public ResponseEntity<?> getAssignedBookingsByUserEmail(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Booking> assignedBookings = bookingRepository.findByUserAndMaidIsNotNull(userOptional.get());
        if (assignedBookings.isEmpty()) {
            return ResponseEntity.ok("No assigned bookings found for this user");
        }

        return ResponseEntity.ok(assignedBookings);
    }



    @GetMapping("/getBookingsByMaid/{email}")
    public ResponseEntity<?> getBookingsByMaidEmail(@PathVariable String email) {
        Optional<Maid> maidOptional = maidRepo.findByEmail(email);
        if (!maidOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Maid not found");
        }

        List<Booking> bookings = bookingRepository.findByMaid(maidOptional.get());
        if (bookings.isEmpty()) {
            return ResponseEntity.ok("No bookings found for this maid");
        }

        return ResponseEntity.ok(bookings);
    }
}
