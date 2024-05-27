package com.travel.booking.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_PAYMENT_AMOUNT("001_PAYMENT", "결제 방식을 확인해주세요"),
    PAYMENT_NOT_FOUND("001_PAYMENT", "결제내역이 없습니다."),
    PAYMENT_AMOUNT_EXP("001_PAYMENT", "결제금액을 확인해주세요"),
    ALREADY_APPROVED("001_PAYMENT","이미 인증된 내용입니다."),
    PAYMENT_NOT_ENOUGH_POINT("001_PAYMENT", "잔액이 부족합니다"),
    USER_NOT_FOUND("002_USER", "유저를 찾지 못했습니다." );

    private final String code;
    private final String msg;
}
