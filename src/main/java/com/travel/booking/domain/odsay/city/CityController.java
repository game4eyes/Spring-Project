package com.travel.booking.domain.odsay.city;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/city")
@RequiredArgsConstructor
public class CityController {
    private final CityService cityService;
    @GetMapping("/info")
    public List<CityDTO> getCityInfo()  {
        return cityService.getCityList();
    }
}
