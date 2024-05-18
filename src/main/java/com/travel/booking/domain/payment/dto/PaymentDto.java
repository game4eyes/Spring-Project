package com.travel.booking.domain.payment.dto;

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

    @NotNull
    private PayType payType;

    @NotNull
    private Long Amount;

    @NotNull
    private String orderName;

    private String yourSuccessUrl;
    private String failUrl;

    public Payment toEntity() {
        return Payment.builder()
                .payType(payType)
                .amount(amount)
                .orderName(orderName)
                .orderId(UUID.randomUUID().toString())
                .paySuccessYN(false)
                .build();
    }


}
