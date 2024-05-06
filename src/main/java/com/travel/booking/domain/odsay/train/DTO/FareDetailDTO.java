package com.travel.booking.domain.odsay.train.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FareDetailDTO {
    // 평일
    private String weekday;
    // 주말
    private String weekend;
    // 연휴
    private String holiday;

    public FareDetailDTO(String weekday, String weekend, String holiday) {
        this.weekday = weekday;
        this.weekend = weekend;
        this.holiday = holiday;
    }
}
