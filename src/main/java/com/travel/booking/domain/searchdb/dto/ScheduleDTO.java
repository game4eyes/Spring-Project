package com.travel.booking.domain.searchdb.dto;

import com.travel.booking.domain.searchdb.entity.Schedule;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ScheduleDTO {
    private Long id;
    // 출발 시각
    private String departureTime;
    // 도착 시각
    private String arrivalTime;
    // ktx 의 경우 열차 번호
    // 항공 의 경우 항공편명
    private String frequency;
    // ktx 의 경우 기차 이름
    // 항공의 경우 항공사 이름
    private String lineName;

    public ScheduleDTO() {}
    public ScheduleDTO(Schedule schedule) {
        this.id = schedule.getId();
        this.departureTime = schedule.getDepartureTime();
        this.arrivalTime = schedule.getArrivalTime();
        this.frequency = schedule.getFrequency();
        this.lineName = schedule.getCarrier().split(",")[0];
    }

}
