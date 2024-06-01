package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.entity.SeatAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface SeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {
    Optional<SeatAvailability> findByScheduleIsAndDate(Schedule schedule, LocalDate date);
}