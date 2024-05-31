package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.booking.entity.SeatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long> {
}