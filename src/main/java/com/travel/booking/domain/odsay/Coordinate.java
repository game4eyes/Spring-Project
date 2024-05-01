package com.travel.booking.domain.odsay;

public enum Coordinate {
    TOPLATITUDE(38.9),
    BOTTOMLATITUDE(33.0),
    LEFTLONGITUDE(124.5),
    RIGHTLONGITUDE(132.0);

    private double vector;

    Coordinate(double vector) {
        this.vector = vector;
    }
    public double getVector() {
        return vector;
    }
}
