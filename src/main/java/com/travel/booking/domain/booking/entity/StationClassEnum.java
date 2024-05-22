package com.travel.booking.domain.booking.entity;

import lombok.Getter;

@Getter
public enum StationClassEnum {
    TRAIN(3, "기차"), AIR(5, "항공"),
    EXPRESS_BUS(4, "고속버스"), INTERCITY_BUS(6, "시외버스");

    private final long key;
    private final String value;

    StationClassEnum(long key, String value) {
        this.key = key;
        this.value = value;
    }
    public static StationClassEnum getEnum(long key) {
        for (StationClassEnum stationClassEnum : StationClassEnum.values()) {
            if (stationClassEnum.getKey() == key) {
                return stationClassEnum;
            }
        }
        throw new IllegalArgumentException("이넘에 stationClass 에 해당하는 값이 없습니다.");
    }
}
