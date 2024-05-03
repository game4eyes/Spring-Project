package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.bus.DTO.BusOperationInfoDTO;
import com.travel.booking.domain.odsay.bus.DTO.BusTerminalDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bus")
public class BusController {
    private final BusService busService;
    @GetMapping("/near/{cityCode}")
    public List<BusTerminalDTO> getNear(@PathVariable String cityCode) {
        return busService.getNearBusTerminalList(cityCode);
    }

    @GetMapping("/express")
    public List<BusTerminalDTO> getExpress(@RequestParam String cityName) {
        return busService.getExpressBusTerminalList(cityName);
    }

    @GetMapping("/intercity")
    public List<BusTerminalDTO> getIntercity(@RequestParam String cityName) {
        return busService.getIntercityBusTerminalList(cityName);
    }

    @GetMapping("/operation/info")
    public BusOperationInfoDTO getOperationInfo(@RequestParam Integer startStationID, @RequestParam Integer endStationID) {
        return busService.getBusOperationInfo(startStationID,endStationID);
    }


}
