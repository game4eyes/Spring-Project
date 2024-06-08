package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Trainprice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrainpriceRepository extends JpaRepository<Trainprice, Long> {
    Optional<Trainprice> findByTrainSchedule_Id(Long id);
}