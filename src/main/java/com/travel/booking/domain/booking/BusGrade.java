package com.travel.booking.domain.booking;

public enum BusGrade {
    GRADE_1("1", "우등"),
    GRADE_2("2", "고속"),
    GRADE_3("3", "심야우등"),
    GRADE_4("4", "심야고속"),
    GRADE_5("5", "일반"),
    GRADE_6("6", "일반심야"),
    GRADE_7("7", "프리미엄"),
    GRADE_8("8", "심야프리미엄");

    
    BusGrade() {
    }

    BusGrade(String number, String 심야프리미엄) {
    }
}
