package com.travel.booking.domain.searchdb.repo;

import com.travel.booking.domain.searchdb.entity.Stationinfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface StationinfoRepository extends JpaRepository<Stationinfo, Long> {
    @Query(value = "SELECT * FROM stationinfo WHERE stationId IN (" +
            "SELECT startStationId FROM schedule WHERE startStationId IN (" +
            "SELECT stationId FROM stationinfo WHERE stationType = :stationTypeId))",
            nativeQuery = true)
    List<Stationinfo> findBusStartListByStationTypeId(Long stationTypeId);
}