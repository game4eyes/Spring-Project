package com.travel.booking.domain.booking.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Builder
public class EtcOrderDTO {
    // 사용자 이메일
    private String userEmail;
    // 스케쥴 id
    private Long scheduleId;
    // 예약 날짜
    private LocalDate date;
    // 기차 항공 자리 예약 등급
    private String seatType;
    // 몇자리 인지
    private Long quantity;
    // 프론트에서 생성한 오더 id
    private String orderId;
}
