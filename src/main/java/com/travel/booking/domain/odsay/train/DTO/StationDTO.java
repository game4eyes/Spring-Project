package com.travel.booking.domain.odsay.train.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "노선 정보", name = "TrainStationSchema")
public class StationDTO {
    // 노선 명
    @Schema(description = "노선 명", example = "KTX경부선")
    private String railName;
    // 열차 종류
    @Schema(description = "열차 종류", example = "KTX")
    private String trainClass;
    // 열차번호
    @Schema(description = "열차 고유 번호", example = "37")
    private Long trainNo;
    // 출발시간
    @Schema(description = "출발 시각", example = "14:19")
    private String departureTime;
    // 도착시간
    @Schema(description = "도착 시각", example = "16:49")
    private String arrivalTime;
    // 소요시간
    @Schema(description = "소요 시각", example = "02:30")
    private String wasteTime;
    // 운행일
//    ex) 토 / 금토일 / 토일 /
//    화수목금토일 / 월화수목토일/
//    금 / 금토 / 금일 / 월 / 매일/
//    월화수목금토
    @Schema(description = "운행일", example = "매일")
    private String runDay;
    // 요금 확장 노드
    // 일반
    @Schema(implementation = FareDTO.class)
    private FareDTO fare;

    public StationDTO(String railName, String trainClass, Long trainNo, String departureTime, String arrivalTime, String wasteTime, String runDay, FareDTO fare) {
        this.railName = railName;
        this.trainClass = trainClass;
        this.trainNo = trainNo;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.wasteTime = wasteTime;
        this.runDay = runDay;
        this.fare = fare;
    }
}
