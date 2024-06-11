package com.travel.booking.domain.payment.controller;

import com.sun.net.httpserver.Headers;
import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.booking.repo.OrderRepository;
import com.travel.booking.domain.payment.config.TossPaymentConfig;
import com.travel.booking.domain.payment.dto.*;
import com.travel.booking.domain.payment.Response.SingleResponse;
import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.payment.mapper.PaymentMapper;
import com.travel.booking.domain.payment.service.PaymentService;
import com.travel.booking.domain.searchdb.exception.SearchException;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class PaymentController {

    private final PaymentService paymentService;
    private final TossPaymentConfig paymentConfig;
    private final UserService userService;
    private final OrderRepository orderRepository;

    @PostMapping(value = "/toss", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> requestPayment(@RequestBody @Valid PaymentDto paymentReqDTO) {
        try {
            Order order = orderRepository.findById(paymentReqDTO.getOrderId())
                    .orElseThrow(()-> {
                        throw new RuntimeException("Order not found");
                    });
            Payment payment = paymentReqDTO.toEntity();
            payment.setOrder(order);
            String userEmail = paymentReqDTO.getUserEmail();
            PaymentResDto paymentResDTO = paymentService.requestPayment(payment, userEmail).toPaymentResDto();
            paymentResDTO.setSuccessUrl(paymentReqDTO.getSuccessUrl() == null ? paymentConfig.getSuccessUrl() : paymentReqDTO.getSuccessUrl());
            paymentResDTO.setFailUrl(paymentReqDTO.getFailUrl() == null ? paymentConfig.getFailUrl() : paymentReqDTO.getFailUrl());
            return ResponseEntity.ok().body(new SingleResponse<>(paymentResDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while processing the payment request: " + e.getMessage());
        }
    }

    @GetMapping("/toss/info")
    public String paymentInfo(@SessionAttribute(name = "email", required = false) String email, Model model){
        User loginUser = userService.FindByEmail(email);

        if (loginUser == null){
            return null;
        }

        model.addAttribute("email", loginUser);
        return "toss/info";
    }

    @GetMapping("/toss/success")
    public ResponseEntity<?> tossPaymentSuccess(
            @RequestParam("paymentKey") String paymentKey,
            @RequestParam("orderId") String orderId,
            @RequestParam("amount") Long amount
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/success-page"));
        paymentService.tossPaymentSuccess(paymentKey, orderId, amount);
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping("/toss/fail")
    public ResponseEntity<?> tossPaymentFail(
            @RequestParam("code") String code,
            @RequestParam("msg") String msg,
            @RequestParam("orderId") String orderId
    ){
        paymentService.tossPaymentFail(code, msg, orderId);
        return ResponseEntity.ok().body(new SingleResponse<>(
                PaymentFailDto.builder()
                        .errorCode(code)
                        .errorMessage(msg)
                        .orderId(orderId)
                        .build()
        ));
    }

    @PostMapping("/toss/cancel")
    public ResponseEntity<?> tossPaymentCancelPoint(
            @AuthenticationPrincipal User principal,
            @RequestParam("paymentKey") String paymentKey,
            @RequestParam("cancelReason") String cancelReason
    ){
        return ResponseEntity.ok().body(new SingleResponse<>(
                paymentService.cancelPaymentPoint(principal.getUsername(), paymentKey, cancelReason)
        ));
    }
}
