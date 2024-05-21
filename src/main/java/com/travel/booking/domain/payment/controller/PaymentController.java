package com.travel.booking.domain.payment.controller;

import com.travel.booking.domain.payment.config.TossPaymentConfig;
import com.travel.booking.domain.payment.dto.*;
import com.travel.booking.domain.payment.Response.SingleResponse;
import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.payment.mapper.PaymentMapper;
import com.travel.booking.domain.payment.service.PaymentService;
import com.travel.booking.domain.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class PaymentController {

    private final PaymentService paymentService;
    private final TossPaymentConfig paymentConfig;
    private PaymentMapper mapper;

    @PostMapping("/toss")
    public ResponseEntity requestPayment(@AuthenticationPrincipal User principal, @RequestBody @Valid PaymentDto paymentReqDTO) {
        PaymentResDto paymentResDTO = paymentService.requestPayment(paymentReqDTO.toEntity(),  principal.getUsername()).toPaymentResDto();
        paymentResDTO.setSuccessUrl(paymentReqDTO.getSuccessUrl() == null ? paymentConfig.getSuccessUrl() : paymentReqDTO.getSuccessUrl());
        paymentResDTO.setFailUrl(paymentReqDTO.getFailUrl() == null ? paymentConfig.getFailUrl() : paymentReqDTO.getFailUrl());

        return ResponseEntity.ok().body(new SingleResponse<>(paymentResDTO));
    }

    @GetMapping("/toss/success")
    public ResponseEntity tossPaymentSuccess(
            @RequestParam String paymentKey,
            @RequestParam String orderId,
            @RequestParam Long amount
    ){
        return  ResponseEntity.ok()
                .body(new SingleResponse<>(paymentService.tossPaymentSuccess(paymentKey,orderId,amount)));
    }


    public ResponseEntity tossPaymentFail(
            @RequestParam String code,
            @RequestParam String msg,
            @RequestParam String orderId
    ){
        paymentService.tossPaymentFail(code,msg,orderId);
        return ResponseEntity.ok().body(new SingleResponse<>(
                PaymentFailDto.builder()
                        .errorCode(code)
                        .errorMessage(msg)
                        .orderId(orderId)
                        .build()
        ));

    }

    public ResponseEntity tossPaymentCancelPoint(
            @AuthenticationPrincipal User princiapl,
            @RequestParam String paymentKey,
            @RequestParam String cancelReason
    ){
        return ResponseEntity.ok().body(new SingleResponse<>(
                paymentService.cancelPaymentPoint(princiapl.getUsername(), paymentKey, cancelReason)
        ));
    }


    public ResponseEntity getChargingHistory(@AuthenticationPrincipal User authMember, Pageable pageable){
        Slice<Payment> chargingHistory = paymentService.findAllChargingHistories(authMember.getUsername(), pageable);
        SliceInfo sliceInfo = new SliceInfo(pageable, chargingHistory.getNumberOfElements(), chargingHistory.hasNext());
        return new ResponseEntity<>(
                new SliceResponseDto<>(mapper.chargingHistoryToChargingHistoryResponses(chargingHistory.getContent()), sliceInfo),
                HttpStatus.OK
        );
    }







}

