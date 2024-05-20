package com.travel.booking.domain.odsay.city;


import com.travel.booking.domain.odsay.bus.DTO.ResultDTO;
import com.travel.booking.domain.odsay.city.DTO.CityDTO;

import com.travel.booking.domain.odsay.city.DTO.CityInfoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/odsay/api/city")
@RequiredArgsConstructor
@Tag(name = "CItyInfo", description = "도시 검색 API")
public class CityInfoController {
    private final CityInfoServiceServiceImpl service;

    @Operation(
            summary = "도 기반 도시 조회",
            description = "Region 을 기반으로 세부 도시 이름 및 코드를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "도시 정보 조회 성공", content = @Content(schema =  @Schema(implementation = CityDTO.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
                    @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없음", content = @Content),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
            }
    )
    @GetMapping
    public List<CityDTO> getCityInfo(
            @Parameter(description = "도시 이름", example = "서울, 경기도") @RequestParam String cityRegion)  {
        return service.getCityList(cityRegion);
    }
}
