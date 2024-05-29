package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Stationtype;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationtypeRepository extends JpaRepository<Stationtype, Long> {
  }