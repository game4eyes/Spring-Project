package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;

@Getter
public class StationDTO {
    private Long stationID;
    private String stationName;
    private double x;
    private double y;

    public StationDTO(Long stationID, String stationName, double x, double y) {
        this.stationID = stationID;
        this.stationName = stationName;
        this.x = x;
        this.y = y;
    }
}
