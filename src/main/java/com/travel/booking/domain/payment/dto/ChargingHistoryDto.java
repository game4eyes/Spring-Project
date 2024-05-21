package com.travel.booking.domain.payment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChargingHistoryDto {

    private Long paymentHistoryId;

    @NotNull
    private Long amount;

    @NotNull
    private String orderName;

    private boolean isPaySuccessYN;
    private LocalDateTime creatAt;


}
