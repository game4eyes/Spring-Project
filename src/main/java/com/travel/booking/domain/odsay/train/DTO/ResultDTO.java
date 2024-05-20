package com.travel.booking.domain.odsay.train.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Schema(title = "기차 검색 결과", name = "TrainSchema")
public class ResultDTO {
    // 시작 역 정보
    @Schema(description = "출발지 기차역 ID", example = "3300128")
    private Long startStationID;
    @Schema(description = "출발지 기차역 이름", example = "서울")
    private String startStationName;
    // 종착점 역 정보
    @Schema(description = "도착지 기차역 ID", example = "3300108")
    private Long endStationID;
    @Schema(description = "도착지 기차역 이름", example = "부산")
    private String endStationName;
    // 노선 정보
    @Schema(implementation = StationDTO.class)
    private List<StationDTO> station;
    // 결과 갯수
    @Schema(description = "운행 하는 기차 수", example = "96")
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

    public ResultDTO(ResultDTO resultDTO, List<StationDTO> filteredstationDTO) {
        this.startStationID = resultDTO.getStartStationID();
        this.startStationName = resultDTO.getStartStationName();
        this.endStationID = resultDTO.getEndStationID();
        this.endStationName = resultDTO.getEndStationName();
        this.station = filteredstationDTO;
        this.count = resultDTO.getCount();
    }
}
