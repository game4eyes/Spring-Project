package com.travel.booking.domain.odsay.city;


import com.travel.booking.domain.odsay.stationInfo.StationDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/city")
@RequiredArgsConstructor
public class CityInfoController {
    private final CityInfoServiceServiceImpl service;

    @GetMapping
    public List<CityDTO> getCityInfo()  {
        return service.getCityList();
    }
}
