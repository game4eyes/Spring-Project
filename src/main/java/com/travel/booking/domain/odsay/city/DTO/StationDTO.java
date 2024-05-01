package com.travel.booking.domain.odsay.city.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StationDTO {
    // 고속철 id
    private Long stationID;
    // 고속철 이름
    private String stationName;
    // 경도
    private double x;
    // 위도
    private double y;

    // 정류장 고유 번호
    private String arsID;
}
