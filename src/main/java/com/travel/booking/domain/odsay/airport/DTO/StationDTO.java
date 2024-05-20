package com.travel.booking.domain.odsay.airport.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "항공 운행 검색 결과", name = "AirResultSchema")
public class StationDTO {
    @Schema(description = "항공사 명", example = "아시아나항공")
    private String airline;

    @Schema(description = "출발 시각", example = "14:00")
    private String departureTime;

    @Schema(description = "도착 시각", example = "15:10")
    private String arrivalTime;

    @Schema(description = "항공기 명", example = "OZ8953")
    private String flight;

    @Schema(description = "운항일", example = "매일")
    private String runDay;

    public StationDTO(String airline, String departureTime, String arrivalTime,
                      String flight, String runDay) {
        this.airline = airline;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.flight = flight;
        this.runDay = runDay;
    }
}
