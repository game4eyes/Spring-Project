package com.travel.booking.domain.odsay.bus.DTO;

import com.travel.booking.domain.odsay.stationInfo.StationDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class BusTerminalDTO {
    private Long stationID;
    private String stationName;
    private double x;
    private double y;
    // 위의 값이 true면 list에 담아서 반환
    private List<StationDTO> stationDTO;
    private int stationClass;
}
