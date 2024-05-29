package com.travel.booking.domain.searchdb;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search/db")
public class SearchDBController {
    private final SearchDBService searchDBService;

    @GetMapping("/start/station/info")
    public ResponseEntity<?> startStation(@RequestParam Long stationTypeId) {
        return searchDBService.getBusStartList(stationTypeId);
    }
}
