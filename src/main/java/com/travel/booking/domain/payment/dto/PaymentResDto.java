package com.travel.booking.domain.payment.dto;

import com.travel.booking.domain.booking.entity.Order;
import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResDto {

    private String payType;     //결제 타입 - 카드,현금,포인트
    private Long amount;        // 가격 정보
    private String orderName;   // 주문명
    private Order order;     // 주문 id
    private String userEmail;   // 고객 이메일
    private String userName;    // 고객명
    private String successUrl;  // 성공시 redirect url
    private String failUrl;     // 실패시 redirect url

    private String failReason;  // 실패 이유
    private boolean cancelYN;   // 취소여부
    private String cancelReason; // 취소이유
    private String createdAt;   // 결제한 시간




}
