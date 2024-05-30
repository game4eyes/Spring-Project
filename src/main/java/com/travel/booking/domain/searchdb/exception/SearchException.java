package com.travel.booking.domain.searchdb.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Slf4j
@Getter
public class SearchException extends RuntimeException{
    private final HttpStatus status;
    private final String errorCode;
    private final String detail;

    public SearchException(HttpStatus status, SearchExceptionCode error) {
        super("Error Code : "+ error.getCode() + ", detail : " + error.getMessage());
        this.status = status;
        this.errorCode = error.getCode();
        this.detail = error.getMessage();
        log.error("SearchException Throwm : " + this);
    }
}
