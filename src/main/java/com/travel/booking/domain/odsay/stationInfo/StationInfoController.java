package com.travel.booking.domain.odsay.stationInfo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/station")
public class StationInfoController {
    private final StationInfoService stationInfoService;
    @GetMapping("/{stationClass}")
    public List<StationDTO> stationInfo(@PathVariable String stationClass) {
        return stationInfoService.getStationList(stationClass);
    }
}
