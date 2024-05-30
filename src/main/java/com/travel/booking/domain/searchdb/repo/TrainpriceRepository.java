package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Trainprice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainpriceRepository extends JpaRepository<Trainprice, Long> {
  }