package com.travel.booking.domain.ariInfo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/air")
public class AriInfoController {
    @Autowired
    private AirInfoService airInfoService;
    @GetMapping("/airport")
    public ArrayList<AirPortDTO> getAirports() {
        return airInfoService.getAirPortDTO();
    }

    @GetMapping("/airline")
    public ArrayList<AirLineDTO> getAirlines() {
        return airInfoService.getAirLineDTO();
    }
}
