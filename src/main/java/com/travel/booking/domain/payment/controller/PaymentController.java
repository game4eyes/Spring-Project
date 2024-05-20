package com.travel.booking.domain.payment.controller;

import com.travel.booking.domain.payment.config.TossPaymentConfig;
import com.travel.booking.domain.payment.dto.PaymentDto;
import com.travel.booking.domain.payment.dto.PaymentResDto;
import com.travel.booking.domain.payment.Response.SingleResponse;
import com.travel.booking.domain.payment.service.PaymentService;
import com.travel.booking.domain.user.entity.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class PaymentController {

    private PaymentService paymentService;
    private TossPaymentConfig paymentConfig;

    @PostMapping("/toss")
    public ResponseEntity requestPayment(@AuthenticationPrincipal UserEntity principal, @RequestBody @Valid PaymentDto paymentReqDTO) {
        PaymentResDto paymentResDTO = paymentService.requestPayment(paymentReqDTO.toEntity(),  principal.getUsername()).toPaymentResDto();
        paymentResDTO.setSuccessUrl(paymentReqDTO.getSuccessUrl() == null ? paymentConfig.getSuccessUrl() : paymentReqDTO.getSuccessUrl());
        paymentResDTO.setFailUrl(paymentReqDTO.getFailUrl() == null ? paymentConfig.getFailUrl() : paymentReqDTO.getFailUrl());

        return ResponseEntity.ok().body(new SingleResponse<>(paymentResDTO));
    }
}
