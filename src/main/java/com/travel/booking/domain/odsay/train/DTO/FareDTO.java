package com.travel.booking.domain.odsay.train.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "요금 리스트", name = "FareListSchema")
public class FareDTO {
    // 일반
    @Schema(description = "일반 요금", implementation = FareDetailDTO.class)
    private FareDetailDTO generalFare;
    // 특실
    @Schema(description = "특실 요금", implementation = FareDetailDTO.class)
    private FareDetailDTO specialFare;
    // 입설/자유석
    @Schema(description = "입석/자유석 요금", implementation = FareDetailDTO.class)
    private FareDetailDTO standingFare;

    public FareDTO(FareDetailDTO generalFare, FareDetailDTO specialFare, FareDetailDTO standingFare) {
        this.generalFare = generalFare;
        this.specialFare = specialFare;
        this.standingFare = standingFare;
    }
}
