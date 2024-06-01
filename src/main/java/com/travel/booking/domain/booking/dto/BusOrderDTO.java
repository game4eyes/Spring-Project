package com.travel.booking.domain.booking.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class BusOrderDTO {
    // 사용자 이메일
    private String userEmail;
    // 예약 스케쥴
    private Long scheduleId;
    // 예약 날짜
    private LocalDate date;
    // 좌석 번호 (리스트로)
    private List<String> seatMapKey;
    // 프론트에서 생성한 오더 id
    private String orderId;
}
