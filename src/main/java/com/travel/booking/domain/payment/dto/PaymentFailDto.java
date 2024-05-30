package com.travel.booking.domain.payment.dto;

import lombok.*;

@Data
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentFailDto {

    String errorCode;
    String errorMessage;
    String orderId;
}
