package com.travel.booking.domain.odsay.train.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StationDTO {
    // 노선 명
    private String railName;
    // 열차 종류
    private String trainClass;
    // 열차번호
    private Long trainNo;
    // 출발시간
    private String departureTime;
    // 도착시간
    private String arrivalTime;
    // 소요시간
    private String wasteTime;
    // 운행일
//    ex) 토 / 금토일 / 토일 /
//    화수목금토일 / 월화수목토일/
//    금 / 금토 / 금일 / 월 / 매일/
//    월화수목금토
    private String runDay;
    // 요금 확장 노드
    // 일반
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
