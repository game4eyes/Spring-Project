package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;

import java.util.List;

@Getter
public class ResultDTO {
    private Long stationID;
    private String stationName;
    private double x;
    private double y;
    private List<StationDTO> destinationTerminals;

    public ResultDTO(Long stationID, String stationName, double x, double y, List<StationDTO> stations) {
        this.stationID = stationID;
        this.stationName = stationName;
        this.x = x;
        this.y = y;
        this.destinationTerminals = stations;
    }
}
