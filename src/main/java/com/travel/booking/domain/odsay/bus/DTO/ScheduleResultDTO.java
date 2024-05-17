package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;

import java.util.List;

@Getter
public class ScheduleResultDTO {
    private Long count;
    private Long stationClass;
    private Long startStationID;
    private String startStationName;
    private Long endStationID;
    private String endStationName;

    private String firstTime;
    private String lastTime;

    private List<DetailDTO> detail;

    public ScheduleResultDTO(Long count, Long stationClass, Long startStationID, String startStationName, Long endStationID, String endStationName, String firstTime, String lastTime, List<DetailDTO> list) {
        this.count = count;
        this.stationClass = stationClass;
        this.startStationID = startStationID;
        this.startStationName = startStationName;
        this.endStationID = endStationID;
        this.endStationName = endStationName;
        this.firstTime = firstTime;
        this.lastTime = lastTime;
        this.detail = list;
    }
}
