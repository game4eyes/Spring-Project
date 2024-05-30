package com.travel.booking.domain.searchdb.dto;

import com.travel.booking.domain.searchdb.entity.Stationinfo;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StationInfoDTO {
    private Long stationId;
    private String stationName;
    private String stationType;
    private Double x;
    private Double y;

    public StationInfoDTO(Stationinfo stationinfo) {
        this.stationId = stationinfo.getId();
        this.stationName = stationinfo.getStationName();
        this.stationType = String.valueOf(stationinfo.getStationType().getId());
        this.x = stationinfo.getX();
        this.y = stationinfo.getY();
    }
}
