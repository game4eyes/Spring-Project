package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.booking.entity.SeatAvailability;
import com.travel.booking.domain.searchdb.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

public interface SeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {
    Optional<SeatAvailability> findByScheduleAndDate(Schedule schedule, LocalDate date);

    Optional<SeatAvailability> findBySchedule_Id(Long id);

    @Transactional
    @Modifying
    @Query("update SeatAvailability s set s.airFirst = ?1 where s.id = ?2")
    int updateAirFirstSeat(Integer airFirst, Long id);
}