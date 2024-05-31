package com.travel.booking.domain.searchdb;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search/db")
public class SearchDBController {
    private final SearchDBService searchDBService;

    @GetMapping("/start/station/info")
    public ResponseEntity<?> startStation(@RequestParam("stationTypeId") Long stationTypeId) {
        return searchDBService.getStationStartList(stationTypeId);
    }

    @GetMapping("/end/station/info")
    public ResponseEntity<?> getEndStations(@RequestParam("startStationId") Long startStationId) {
        return searchDBService.getStationStopList(startStationId);
    }

    @GetMapping("/schedule/info")
    public ResponseEntity<?> getSchedule(@RequestParam("startStationId") Long startStationId, @RequestParam("endStationId") Long endStationId,
    @RequestParam("weekdayCarrier") String weekdayCarrier, @RequestParam("departureTime") String departureTime) {
        return searchDBService.getSchedules(startStationId,endStationId,weekdayCarrier,departureTime);
    }

    @GetMapping("/schedule/info/bus")
    public ResponseEntity<?> getBusSchedule(@RequestParam("startStationId") Long startStationId, @RequestParam("endStationId") Long endStationId,
                                            @RequestParam("gradeCarrier") String gradeCarrier, @RequestParam("departureTime") String departureTime) {
        return searchDBService.getBusSchedule(startStationId,endStationId,gradeCarrier,departureTime);
    }

    @GetMapping("/train/price")
    public ResponseEntity<?> getTrainPriceDefault(@RequestParam("TrainScheduleId") Long trainScheduleId) {
        return searchDBService.getTrainPrice(trainScheduleId);
    }
}
