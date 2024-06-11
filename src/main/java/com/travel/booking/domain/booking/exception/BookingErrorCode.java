package com.travel.booking.domain.booking.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BookingErrorCode {
    UNKNOWN("404","알 수 없는 에러가 발생하였습니다."),
    BOOKING_USER_FAILED("001_BOOKING", "사용자를 확인하지 못 하였습니다."),
    BOOKING_EMAIL_FAILED("002_BOOKING", "입력된 이메일이 없습니다."),
    BOOKING_ORDER_INFO_FAILED("403", "예약 정보를 찾을 수 없습니다.")
    ;

    private final String code;
    private final String msg;
}
