package com.travel.booking.domain.odsay.airport.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class StationDTO {
    // 항공사 명
    private String airline;
    // 출발 시각
    private String departureTime;
    // 도착 시각
    private String arrivalTime;
    // 항공기 명
    private String flight;
    // 운항일
    private String runDay;

    public StationDTO(String airline, String departureTime, String arrivalTime,
                      String flight, String runDay) {
        this.airline = airline;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.flight = flight;
        this.runDay = runDay;
    }
}
