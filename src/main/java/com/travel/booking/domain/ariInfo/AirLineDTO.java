package com.travel.booking.domain.ariInfo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

@Repository
@Getter @Setter
public class AirLineDTO {
    private String airlineId;
    private String airlineNm;
}
