package com.travel.booking.domain.busInfo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bus")
public class BusInfoController {
    private final BusInfoService busInfoService;

    @GetMapping("/terminal")
    public List<TerminalListDTO> getBusTerminalListInfo(){
        return busInfoService.getTerminalListDTO();
    }
}
