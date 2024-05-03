package com.travel.booking.domain.odsay.stationInfo;

import java.util.List;

public interface StationInfoService {
    List<StationDTO> getStationList(String stationClass);
}
