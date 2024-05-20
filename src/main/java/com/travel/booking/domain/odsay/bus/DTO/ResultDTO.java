package com.travel.booking.domain.odsay.bus.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(title = "버스 검색 결과", name = "BusSchema")
public class ResultDTO {
    @Schema(description = "출발지 터미널 ID", example = "4000035")
    private Long stationID;
    @Schema(description = "출발지 터미널 이름", example = "동서울종합터미널")
    private String stationName;
    @Schema(description = "출발지 경도 좌표", example = "128.879619842603")
    private double x;
    @Schema(description = "출발지 위도 좌표", example = "37.7545150811608")
    private double y;
    @Schema(implementation = StationDTO.class)
    private List<StationDTO> destinationTerminals;

    public ResultDTO(Long stationID, String stationName, double x, double y, List<StationDTO> stations) {
        this.stationID = stationID;
        this.stationName = stationName;
        this.x = x;
        this.y = y;
        this.destinationTerminals = stations;
    }
}
