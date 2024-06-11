package com.travel.booking.domain.payment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PayType {
    CASH("현금"),
    CARD("카드"),
    POINT("포인트");

    private final String description; // 각 상수에 대한 설명

    // 설명 반환 메서드
    public String getDescription() {
        return description;
    }
}

