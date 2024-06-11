package com.travel.booking.domain.searchdb.dto;

import com.travel.booking.domain.searchdb.entity.Schedule;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BusScheduleDTO {
    private Long id;
    private String departureTime;
    private String arrivalTime;
    private String frequency;
    private Integer price;
    private String carrier;

    public BusScheduleDTO() {}
    public BusScheduleDTO(Schedule schedule) {
        this.id = schedule.getId();
        this.departureTime = schedule.getDepartureTime();
        this.arrivalTime = schedule.getArrivalTime();
        this.frequency = schedule.getFrequency();
        this.price = schedule.getPrice();
        this.carrier = schedule.getCarrier();
    }
}
