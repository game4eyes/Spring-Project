package com.travel.booking.domain.odsay.airport;

import com.travel.booking.domain.odsay.airport.DTO.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/air")
public class AirInfoController {
    private final AirInfoService airInfoService;

    @GetMapping("/{startStationID}/{endStationID}")
    public ResultDTO getAirInfo(@PathVariable String startStationID,
                                @PathVariable String endStationID,
                                @RequestParam Long hour,
                                @RequestParam char dayz) {
        return airInfoService.getAirInfo(startStationID, endStationID, hour, dayz);
    }
}
