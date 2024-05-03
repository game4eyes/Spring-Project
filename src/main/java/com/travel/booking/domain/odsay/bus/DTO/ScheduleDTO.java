package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ScheduleDTO {
    public String busClass;
    public String departureTime;
    public Long wasteTime;
    public Long fare;
}
