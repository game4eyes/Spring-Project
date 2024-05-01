package com.travel.booking.domain.odsay.city;

import com.travel.booking.domain.odsay.city.DTO.CityDTO;
import com.travel.booking.domain.odsay.city.DTO.StationDTO;

import java.util.List;

public interface BasicInfoService {
    List<CityDTO> getCityList();
    List<StationDTO> getStationList(String stationClass);
}
