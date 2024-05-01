package com.travel.booking.domain.odsay.city;

import com.travel.booking.domain.odsay.city.DTO.CityDTO;
import com.travel.booking.domain.odsay.city.DTO.StationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/info")
@RequiredArgsConstructor
public class BasicInfoController {
    private final BasicInfoServiceServiceImpl cityService;

    @GetMapping("/city")
    public List<CityDTO> getCityInfo()  {
        return cityService.getCityList();
    }

    @GetMapping("/station/{stationClass}")
    public List<StationDTO> getStationInfo(@PathVariable String stationClass)  {
        return cityService.getStationList(stationClass);
    }
}
