package com.travel.booking.domain.booking.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Slf4j
@Getter
public class BookingException extends RuntimeException {
    private final HttpStatus status;
    private final String errorCode;
    private final String detail;

    public BookingException(HttpStatus status, BookingErrorCode errorStatus) {
        super("Error Code: " + errorStatus.getCode() + ", Message: " + errorStatus.getMsg());
        this.status = status;
        this.errorCode = errorStatus.getCode();
        this.detail = errorStatus.getMsg();
        log.error("BookingException thrown: {}", this);
    }

}
