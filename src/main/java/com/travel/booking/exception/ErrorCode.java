package com.travel.booking.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVAILD_PAYMENT_AMOUNT("001_PAYMENT", "결제 방식을 확인해주세요");


    private final String code;
    private final String msg;
}
