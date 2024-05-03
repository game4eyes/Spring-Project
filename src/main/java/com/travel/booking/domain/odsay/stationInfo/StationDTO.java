package com.travel.booking.domain.odsay.stationInfo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StationDTO {
    // 역 id
    private Long stationID;
    // 역 이름
    private String stationName;
    // 경도
    private double x;
    // 위도
    private double y;

}
