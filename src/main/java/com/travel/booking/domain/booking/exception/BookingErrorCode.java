package com.travel.booking.domain.booking.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BookingErrorCode {
    UNKNOWN("404_NOTFOUND","알 수 없는 에러가 발생하였습니다."),
    BOOKING_USER_FAILED("001_BOOKING", "유저 정보를 확인해 주세요"),
    BOOKING_DATE_FAILED("002_BOOKING", "예약 날짜를 확인해 주세요"),
    BOOKING_DEPARTURE_TIME_FAILED("003_BOOKING", "출발 시간을 확인해 주세요"),
    BOOKING_WASTE_TIME_FAILED("004_BOOKING", "도착시각을 확인해 주세요."),
    BOOKING_START_STATION_INFO_FAILED("005_BOOKING", "출발지 정보를 확인할 수 없습니다."),
    BOOKING_END_STATION_INFO_FAILED("006_BOOKING", "도착지 정보를 확인할 수 없습니다."),
    BOOKING_STATION_CLASS_FAILED("007_BOOKING", "차량 종류를 확인할 수 없습니다."),
    BOOKING_OPERATOR_FAILED("008_BOOKING", "운행사 정보가 없습니다."),
    BOOKING_GRADE_FAILED("009_BOOKING","좌석 등급을 확인해 주세요"),
    BOOKING_BUS_SEAT_NUM_FAILED("010_BOOKING", "버스 인것은 확인이 되었으나 좌석 번호가 없습니다."),
    BOOKING_AMOUNT_FAILED("011_BOOKING", "가격이 없습니다. 확인해 주세요"),
    BOOKING_BOOKING_INFO_FAILED("000_BOOKING", "데이터를 확인할 수 없습니다."),
    BOOKING_DATABASE_ERROR("DATABASEERROR", "데이터베이스 저장 중 오류가 발생하였습니다."),
    BOOKING_EMAIL_FAILED("012_BOOKING", "이메일 정보를 확인할 수 없습니다.");

    private final String code;
    private final String msg;
}
