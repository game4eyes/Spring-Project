package com.travel.booking.domain.odsay.city.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Schema(title = "도시 목록 조회 결과", name = "CitySchema")
public class CityDTO {
    @Schema(description = "도시 이름", example = "서울")
    private String cityRegion;
    @Schema(implementation = CityInfoDTO.class)
    private List<CityInfoDTO> cityInfoDTO;
}
