//package com.travel.booking.domain.payment;
//
//import jakarta.validation.Valid;
//import org.apache.catalina.User;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//@Controller
//public class PaymentController {
//
//    private PaymentsConfig paymentsConfig;
//    private PaymentService paymentService;
//
//
//    @PostMapping("/toss")
//    public ResponseEntity requestPayment(@AuthenticationPrincipal User principal, @RequestBody @Valid PaymentDTO paymentReqDTO) {
//        PaymentResDTO paymentResDTO = paymentService.requestPayment(paymentReqDTO.toEntity(),  principal.getUsername()).toPaymentResDto();
//        paymentResDTO.setSuccessUrl(paymentReqDTO.getSuccessUrl() == null ? paymentsConfig.getSuccessUrl() : paymentReqDTO.getSuccessUrl());
//        paymentResDTO.setFailUrl(paymentReqDTO.getFailUrl() == null ? paymentsConfig.getFailUrl() : paymentReqDTO.getFailUrl());
//
//        return ResponseEntity.ok().body(new SingleResponse<>(paymentResDTO));
//    }
//
//
//}
