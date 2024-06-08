package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Stationinfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StationinfoRepository extends JpaRepository<Stationinfo, Long> {
    List<Stationinfo> findByStationType_IdOrderById(Long id);

    Optional<Stationinfo> findFirstByIdOrderByIdDesc(Long id);
}
