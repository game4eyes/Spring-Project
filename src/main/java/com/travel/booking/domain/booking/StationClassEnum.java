package com.travel.booking.domain.booking;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StationClassEnum {
    TRAIN(3, "기차"), AIR(5,"항공"),
    EXPRESS_BUS(4,"고속버스"), INTERCITY_BUS(6,"시외버스");

    private final long key;
    private final String value;
}
