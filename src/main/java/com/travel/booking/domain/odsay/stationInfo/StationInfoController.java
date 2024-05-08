package com.travel.booking.domain.odsay.stationInfo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/station")
public class StationInfoController {
    private final StationInfoService stationInfoService;
    @GetMapping("/{stationClass}")
    public List<StationDTO> stationInfo(@PathVariable String stationClass) {
        return stationInfoService.getStationList(stationClass);
    }
}
