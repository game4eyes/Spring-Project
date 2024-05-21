package com.travel.booking.domain.payment.dto;

import lombok.Data;

@Data
public class PaymentSuccessDto {

    String mid;
    String version;
    String paymentKey;
    String orderName;
    String currency; // "KRW"
    String method; // 결제 수단
    String totalAmount;
    String balanceAmount;
    String suppliedAmount;
    String vat; // 부가가치세
    String status; // 결제 처리 상태
    String requestedAt;
    String approvedAt;
    String useEscrow; // false
    String cultureExpense;  // false
    PaymentSuccessCardDto card; // 결제 카드 정보
    String type; // 결제타입 정보 ( Normal / Biling / ConnectPay)







}
