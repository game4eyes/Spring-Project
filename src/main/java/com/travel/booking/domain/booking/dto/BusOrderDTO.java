package com.travel.booking.domain.booking.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@Builder
public class BusOrderDTO {
    private Long userEmail;
    private Long scheduleId;
    private LocalDate date;
    private List<String> seatMapKey;
}
