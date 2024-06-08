package com.travel.booking.domain.searchdb;

import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.booking.repo.OrderRepository;
import com.travel.booking.domain.searchdb.dto.OrderInfoResultDTO;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.repo.ScheduleRepository;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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

    @GetMapping("/seat/availability")
    public ResponseEntity<?> getSeatAvailability(@RequestParam("SeatScheduleId") Long scheduleId,
                                                 @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate selectDate) {
        return searchDBService.getSeatAvailability(scheduleId, selectDate);
    }

    @GetMapping("/user/order/info")
    public ResponseEntity<?> getOrderInfo(@RequestParam("userEmail") String userEmail) {
        return searchDBService.getUserOrderList(userEmail);
    }
}
