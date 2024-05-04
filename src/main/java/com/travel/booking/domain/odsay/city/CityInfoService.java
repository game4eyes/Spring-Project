package com.travel.booking.domain.odsay.city;


import com.travel.booking.domain.odsay.city.DTO.CityDTO;

import java.util.List;

public interface CityInfoService {
    List<CityDTO> getCityList(String cityRegion);


}
