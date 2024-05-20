package com.travel.booking.domain.odsay.stationInfo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "정류장 검색 결과", name = "StationSchema")
public class StationDTO {
    @Schema(description = "정류장 ID", example = "4000170")
    private Long stationID;
    @Schema(description = "정류장 이름", example = "구미종합버스터미널")
    private String stationName;
    @Schema(description = "경도", example = "128.352105")
    private double x;
    @Schema(description = "위도", example = "36.122686")
    private double y;

}
