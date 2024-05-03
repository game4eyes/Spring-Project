package com.travel.booking.domain.payment;

public enum ExceptionCode {
    INVALID_PAYMENT_AMOUNT("결제정보가 맞지 않습니다."),
    USER_NOT_FOUND("없는 유저정보입니다."),
    // 다른 예외 코드 추가 가능
    ;

    private final String message;

    ExceptionCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
