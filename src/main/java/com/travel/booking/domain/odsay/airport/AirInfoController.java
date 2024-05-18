package com.travel.booking.domain.odsay.airport;

import com.travel.booking.domain.odsay.airport.DTO.ResultDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Tag(name = "AirInfoController", description = "항공 검색 결과 API")
@RequestMapping("/odsay/api/air")
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
