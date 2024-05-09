package com.travel.booking.domain.odsay.airport.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ResultDTO {
    private Long startStationID;
    private String startStationName;
    private Long endStationID;
    private String endStationName;
    private List<StationDTO> station;
    private Long count;

    public ResultDTO(Long startStationID, String startStationName, Long endStationID,
                     String endStationName, List<StationDTO> stationDTOList, Long count) {
        this.startStationID = startStationID;
        this.startStationName = startStationName;
        this.endStationID = endStationID;
        this.endStationName = endStationName;
        this.station = stationDTOList;
        this.count = count;
    }

    public ResultDTO(ResultDTO object, List<StationDTO> filteredStationDTOList) {
        this.startStationID = object.getStartStationID();
        this.startStationName = object.getStartStationName();
        this.endStationID = object.getEndStationID();
        this.endStationName = object.getEndStationName();
        this.station = filteredStationDTOList;
        this.count = object.getCount();
    }
}
