package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.bus.DTO.ResultDTO;
import com.travel.booking.domain.odsay.bus.DTO.ScheduleResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("/odsay/api/bus")
public class BusController {
    private final BusService busService;

    @GetMapping
    public List<ResultDTO> getAllBus(@RequestParam Long stationClass, @RequestParam String cityCode){
        return busService.getBusTerminal(stationClass, cityCode);
    }

    @GetMapping("/schedule")
    public ScheduleResultDTO getBusSchedule(@RequestParam Long startStationID, @RequestParam Long endStationID){
        return busService.getSchedule(startStationID, endStationID);
    }
}
