package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class BusOperationInfoDTO {
    private Long startStationID;
    private Long endStationID;
    private String startStationName;
    private String endStationName;
    // 첫차 시간
    private String firstTime;
    // 막차 시간
    private String lastTime;
    // 운행정보
    private List<ScheduleDTO> schedule;
}
