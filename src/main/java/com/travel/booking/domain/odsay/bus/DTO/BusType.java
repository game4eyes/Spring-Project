package com.travel.booking.domain.odsay.bus.DTO;


public enum BusType {
    일반(1),
    운동(2),
    프리미엄(3),
    샤워_일반(4),
    샤워_운동(5),
    샤워_프리미엄(6),
    주말_프리미엄(7),
    주말샤워_프리미엄(8);

    private final int typeCode;

    BusType(int typeCode) {
        this.typeCode = typeCode;
    }

    public static String getType(int code) {
        for (BusType type : BusType.values()) {
            if (type.typeCode == code) {
                return type.name();
            }
        }
        return "Invalid Type";
    }
}
