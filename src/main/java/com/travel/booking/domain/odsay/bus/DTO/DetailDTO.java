package com.travel.booking.domain.odsay.bus.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;


@Getter
@Schema(title = "버스 운행 리스트", name = "BusScheduleDetailSchema")
public class DetailDTO {
    @Schema(description = "버스 등급", example = "2")
    private Long busClass;
    @Schema(description = "출발 시간", example = "07:30")
    private String departureTime;
    @Schema(description = "소요 시간(분)", example = "140")
    private Long wasteTime;
    @Schema(description = "요금", example = "22800")
    private Long fare;

    public DetailDTO(Long busClass, String departureTime, Long wasteTime, Long fare) {
        this.busClass = busClass;
        this.departureTime = departureTime;
        this.wasteTime = wasteTime;
        this.fare = fare;
    }
}
