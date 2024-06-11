package com.travel.booking.domain.booking.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter @Setter
@Builder
public class OrderDto {
    private String userEmail;
    private Long scheduleId;
    private String orderId;
    @DateTimeFormat(pattern = "yyyy-DD-mm")
    private LocalDate orderDate; // 예약 날짜
    // 항공 Economy, Business, First
    // 기차 StandingFreeSeating, General, Special
    // 버스 Bus
    private String grade; // 버스 X 항공과 기차일 경우에만 필요
    private Integer seatOrderNum; // 예약한 좌석의 수
}
