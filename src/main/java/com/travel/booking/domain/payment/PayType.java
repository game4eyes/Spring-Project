package com.travel.booking.domain.payment;


public enum PayType {
    CARD("Credit Card"),
    CASH("Cash"),
    POINT("Reward Points");

    private final String description;

    PayType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
