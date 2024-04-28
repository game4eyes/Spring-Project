package com.travel.booking.domain.payment;

import lombok.*;

import java.util.UUID;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    // 결제 호출 요청을 하는 DTO
    @NonNull
    private PayType payType; // 결제 타입
    @NonNull
    private Long amount; // 가격정보
    @NonNull
    private String orderName; // 주문명

    private String successUrl; // 성공시 리다이렉트 URL
    private String failUrl; // 실패시 리다이렉트 URL

    public PaymentEntity toEntity(){
        return PaymentEntity.builder()
                .payType(payType)
                .amount(amount)
                .orderName(orderName)
                .orderId(UUID.randomUUID().toString())
                .paySuccessYN(false)
                .build();
    }
}
