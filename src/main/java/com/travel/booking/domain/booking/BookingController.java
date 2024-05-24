package com.travel.booking.domain.booking;

import com.travel.booking.domain.booking.dto.BookingDTO;
import com.travel.booking.domain.booking.exception.BookingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/booking")
public class BookingController {
    private final BookingService service;

    @PostMapping
    public ResponseEntity<?> setBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            return ResponseEntity.ok(service.createBooking(bookingDTO));
        } catch (BookingException e) {
            // 오류 응답에 오류 코드를 포함
            Map<String, Object> errorDetails = new HashMap<>();
            errorDetails.put("errorCode", e.getErrorCode());
            errorDetails.put("message", e.getDetail());
            return ResponseEntity.status(e.getStatus()).body(errorDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류가 발생했습니다.");
        }
    }



}
