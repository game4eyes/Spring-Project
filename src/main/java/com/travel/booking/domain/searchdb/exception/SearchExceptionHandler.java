package com.travel.booking.domain.searchdb.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class SearchExceptionHandler {
    // 선언된 에러 발생시를 대비한 헨들러
    @ExceptionHandler(SearchException.class)
    public ResponseEntity<Object> handleSearchException(SearchException e) {
        Map<String,Object> response = new HashMap<>();
        response.put("Error Code : ", e.getErrorCode());
        response.put("Error Message : ", e.getDetail());
        return new ResponseEntity<>(response,e.getStatus());
    }
    // 선언 되지 않은 에러 발생 때를 대비한 헨들러
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
    }
}
