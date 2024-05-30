package com.travel.booking.domain.payment.mapper;

import com.travel.booking.domain.payment.dto.ChargingHistoryDto;
import com.travel.booking.domain.payment.entity.Payment;

import java.util.List;
import java.util.stream.Collectors;

public interface PaymentMapper {

    default List<ChargingHistoryDto> chargingHistoryToChargingHistoryResponses(List<Payment> chargingHistories){
        if(chargingHistories == null){
            return null;
        }

        return chargingHistories.stream()
                .map(chargingHistory -> {
                    return ChargingHistoryDto.builder()
                            .paymentHistoryId(chargingHistory.getPaymentId())
                            .amount(chargingHistory.getAmount())
                            .orderName(chargingHistory.getOrderName())
                            .creatAt(chargingHistory.getCreatedAt())
                            .isPaySuccessYN(chargingHistory.isPaySuccessYN())
                            .build();
                }).collect(Collectors.toList());


    }


}
