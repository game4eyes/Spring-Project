package com.travel.booking.domain.booking.dto;

import com.travel.booking.domain.booking.entity.StationClassEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
@Getter @Setter
// 예약을 하기 위한 정보
public class BookingDTO {
    // 사용자 email
    private String email;
    // 출 도착지 id와 이름
    private Long startStationId;
    private Long endStationId;
    private String startStationName;
    private String endStationName;
    // 자량 종류
    private Long stationClass;
    // 운행사
    // 기차 : 노선 이름
    // ktx 경부선, 무궁화호 등등
    // 항공 : 항공사 이름
    // 예) 아시아나항공, 대한항공 등등
    // 버스일 경우 사용 X
    private String operator;
    // 좌석 종류
    private String grade;
    // 좌석 수
    private Long seatNum;
    // 버스일 경우 좌석 번호
    // 이건 배열로 넘겨 주시면 됩니다.
    private List<Integer> busSeatNum;
    // 예약 날짜
    private LocalDate date;
    // 예약 시간
    private LocalTime time;
    // 가격
    private Integer amount;
}
