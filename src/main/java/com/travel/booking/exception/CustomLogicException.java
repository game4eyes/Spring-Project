package com.travel.booking.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomLogicException extends RuntimeException{

    private ErrorCode errorCode;
    private String detail;

    public CustomLogicException(ErrorCode errorCode){
        super(errorCode.getMsg());
        this.errorCode = errorCode;
        this.detail = errorCode.getMsg();
    }


}
