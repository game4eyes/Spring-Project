package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Seatavailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatavailabilityRepository extends JpaRepository<Seatavailability, Long> {
}