package com.travel.booking.domain.odsay.bus.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(title = "버스 검색 결과", name = "BusScheduleSchema")
public class ScheduleResultDTO {
    @Schema(description = "운행수", example = "17")
    private Long count;
    @Schema(description = "버스 종류(4:고속, 6:시외)", example = "4")
    private Long stationClass;
    @Schema(description = "시작 정류소 ID", example = "4000035")
    private Long startStationID;
    @Schema(description = "시작 정류소 이름", example = "동서울종합터미널")
    private String startStationName;
    @Schema(description = "도착 정류소 ID", example = "3400002")
    private Long endStationID;
    @Schema(description = "도착 정류소 이름", example = "강릉고속버스터미널")
    private String endStationName;
    @Schema(description = "첫차 시간", example = "07:30")
    private String firstTime;
    @Schema(description = "막차 시간", example = "22:20")
    private String lastTime;
    @Schema(implementation = DetailDTO.class)
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
