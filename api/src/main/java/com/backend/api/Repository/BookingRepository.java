package com.backend.api.Repository;


import com.backend.api.Enity.Booking;
import com.backend.api.Enity.Maid;
import com.backend.api.Enity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {


    List<Booking> findByUser(User user);

    @Query("SELECT b FROM Booking b WHERE b.maid IS NULL")
    List<Booking> findAllUnassignedBookings();

    List<Booking> findByUserAndMaidIsNotNull(User user);

    List<Booking> findByMaid(Maid maid);

    boolean existsByMaidAndDate(Maid maid, String date);

}
