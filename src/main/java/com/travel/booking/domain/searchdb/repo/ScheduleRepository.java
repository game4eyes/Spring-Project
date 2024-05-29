package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}