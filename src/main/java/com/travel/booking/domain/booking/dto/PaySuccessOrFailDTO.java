package com.travel.booking.domain.booking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PaySuccessOrFailDTO {
    private String userEmail;
    private String orderId;
}
