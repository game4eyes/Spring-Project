package com.travel.booking.domain.odsay.airport.DTO;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Schema(title = "항공 검색 결과", name = "AirSchema")
public class ResultDTO {
    @Schema(description = "출발지 공항 ID", example = "3500001")
    private Long startStationID;

    @Schema(description = "출발지 공항 이름", example = "김포국제공항")
    private String startStationName;

    @Schema(description = "도착지 공항 ID", example = "3500003")
    private Long endStationID;

    @Schema(description = "도착지 공항 이름", example = "제주")
    private String endStationName;

    @Schema(implementation = StationDTO.class)
    private List<StationDTO> station;

    @Schema(description = "항공편 수", example = "5")
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
