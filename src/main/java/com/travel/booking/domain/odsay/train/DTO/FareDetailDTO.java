package com.travel.booking.domain.odsay.train.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "요금표", name = "FareDetailSchema")
public class FareDetailDTO {
    // 평일
    @Schema(description = "평일 요금")
    private String weekday;
    // 주말
    @Schema(description = "주말 요금")
    private String weekend;
    // 연휴
    @Schema(description = "연휴 요금")
    private String holiday;

    public FareDetailDTO(String weekday, String weekend, String holiday) {
        this.weekday = weekday;
        this.weekend = weekend;
        this.holiday = holiday;
    }
}
