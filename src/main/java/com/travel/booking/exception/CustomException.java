package com.travel.booking.exception;

import com.travel.booking.domain.payment.ExceptionCode;

public class CustomException extends RuntimeException{
    private final ExceptionCode exceptionCode;

    public CustomException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage()); // 예외 메시지 설정
        this.exceptionCode = exceptionCode; // 예외 코드를 설정
    }

    public ExceptionCode getExceptionCode() {
        return exceptionCode;
    }


}
