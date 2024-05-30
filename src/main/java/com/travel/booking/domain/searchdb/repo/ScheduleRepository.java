package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByStartStation_IdOrderByIdDesc(Long id);

    List<Schedule> findByStartStation_IdAndEndStation_IdAndDepartureTimeGreaterThanEqual(Long id, Long id1, String departureTime);

    Optional<Schedule> findByIdAndCarrierLikeOrCarrierLike(Long id, String carrier, String carrier1);
}