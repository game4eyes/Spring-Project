package com.travel.booking.domain.odsay.bus.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(title = "도착지 리스트", name = "BusEndStationSchema")
public class StationDTO {
    @Schema(description = "도착지 터미널 ID", example = "3400002")
    private Long stationID;
    @Schema(description = "도착지 터미널 명", example = "강릉고속버스터미널")
    private String stationName;
    @Schema(description = "도착지 경도 좌표", example = "128.879619842603")
    private double x;
    @Schema(description = "도착지 위도 좌표", example = "37.7545150811608")
    private double y;

    public StationDTO(Long stationID, String stationName, double x, double y) {
        this.stationID = stationID;
        this.stationName = stationName;
        this.x = x;
        this.y = y;
    }
}
