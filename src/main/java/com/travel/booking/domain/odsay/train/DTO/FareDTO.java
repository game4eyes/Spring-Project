package com.travel.booking.domain.odsay.train.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FareDTO {
    // 일반
    private FareDetailDTO generalFare;
    // 특실
    private FareDetailDTO specialFare;
    // 입설/자유석
    private FareDetailDTO standingFare;

    public FareDTO(FareDetailDTO generalFare, FareDetailDTO specialFare, FareDetailDTO standingFare) {
        this.generalFare = generalFare;
        this.specialFare = specialFare;
        this.standingFare = standingFare;
    }
}
