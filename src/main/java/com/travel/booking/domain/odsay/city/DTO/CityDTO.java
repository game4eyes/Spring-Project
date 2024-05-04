package com.travel.booking.domain.odsay.city.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CityDTO {
    private String cityRegion;
    private List<CityInfoDTO> cityInfoDTO;
}
