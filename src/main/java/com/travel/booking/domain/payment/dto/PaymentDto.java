package com.travel.booking.domain.payment.dto;

import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.payment.PayType;
import com.travel.booking.domain.payment.entity.Payment;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {

    private PayType payType;

    @NotNull
    private Long amount;

    @NotNull
    private String orderName;

    private String orderId;

    private String userEmail;

    private String SuccessUrl;
    private String failUrl;

    public Payment toEntity() {
        return Payment.builder()
                .payType(payType)
                .amount(amount)
                .userEmail(userEmail)
                .orderName(orderName)
                .paySuccessYN(false)
                .build();
    }


}
