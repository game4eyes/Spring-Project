package com.travel.booking.domain.odsay.city;


import com.travel.booking.domain.odsay.city.DTO.CityDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class CityInfoController {
    private final CityInfoServiceServiceImpl service;

    @GetMapping
    public List<CityDTO> getCityInfo(@RequestParam String cityRegion)  {
        return service.getCityList(cityRegion);
    }
}
