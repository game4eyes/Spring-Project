package com.travel.booking.domain.booking;

import com.travel.booking.domain.booking.dto.OrderDto;
import com.travel.booking.domain.booking.dto.PaySuccessOrFailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/insert/db")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("/order/pending")
    public ResponseEntity<?> insertOrderPending(@RequestBody OrderDto orderDto) {
        return bookingService.insertOrder(orderDto);
    }

    @PostMapping("/order/payment/complete")
    public ResponseEntity<?> complitePay(@RequestBody PaySuccessOrFailDTO paySuccessOrFailDTO) {
        return bookingService.paySuccess(paySuccessOrFailDTO);
    }

    @PostMapping("/order/payment/fail")
    public ResponseEntity<?> complitePayFail(@RequestBody PaySuccessOrFailDTO paySuccessOrFailDTO) {
        return bookingService.payFail(paySuccessOrFailDTO);
    }
}
