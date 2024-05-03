package com.travel.booking.domain.odsay.bus.DTO;


public enum BusType {
    일반(1L),
    우등(2L),
    프리미엄(3L),
    심야일반(4L),
    심야우등(5L),
    심야프리미엄(6L),
    주말프리미엄(7L),
    주말심야프리미엄(8L);

    private final Long typeCode;

    BusType(Long typeCode) {
        this.typeCode = typeCode;
    }

    public static String getType(Long code) {
        for (BusType type : BusType.values()) {
            if (type.typeCode == code) {
                return type.name();
            }
        }
        return "Invalid Type";
    }
}
