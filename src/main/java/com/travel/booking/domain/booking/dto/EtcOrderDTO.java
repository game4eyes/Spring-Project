package com.travel.booking.domain.booking.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
@Builder
public class EtcOrderDTO {
    private Long userEmail;
    private Long scheduleid;
    private LocalDate date;
    private String seatType;
    private Long quantity;
}
