package com.travel.booking.domain.odsay.train.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ResultDTO {
    // 시작 역 정보
    private Long startStationID;
    private String startStationName;
    // 종착점 역 정보
    private Long endStationID;
    private String endStationName;
    // 노선 정보
    private List<StationDTO> station;
    // 결과 갯수
    private Long count;

    public ResultDTO(Long startStationID, String startStationName, Long endStationID,
                     String endStationName, List<StationDTO> station, Long count) {
        this.startStationID = startStationID;
        this.startStationName = startStationName;
        this.endStationID = endStationID;
        this.endStationName = endStationName;
        this.station = station;
        this.count = count;
    }
}
