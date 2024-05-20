package com.travel.booking.domain.odsay.city.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(title = "세부 도시 검색 결과", name = "CityDetailSchema")
public class CityInfoDTO {
    @Schema(description = "도시 코드", example = "1000")
    private String cityCode;
    @Schema(description = "도시 이름", example = "서울")
    private String cityName;
}
