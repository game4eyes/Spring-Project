package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.searchdb.entity.SeatAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {
}