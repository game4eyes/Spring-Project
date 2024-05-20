package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;


@Getter
public class DetailDTO {
    private Long busClass;
    private String departureTime;
    private Long wasteTime;
    private Long fare;

    public DetailDTO(Long busClass, String departureTime, Long wasteTime, Long fare) {
        this.busClass = busClass;
        this.departureTime = departureTime;
        this.wasteTime = wasteTime;
        this.fare = fare;
    }
}
