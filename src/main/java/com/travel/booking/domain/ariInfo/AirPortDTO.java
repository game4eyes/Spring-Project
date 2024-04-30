package com.travel.booking.domain.ariInfo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

@Repository
@Getter @Setter
public class AirPortDTO {
    private String airportId;
    private String airportNm;
}
