package com.travel.booking.domain.odsay.stationInfo;

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
@RequiredArgsConstructor
@RequestMapping("/odsay/api/station")
@Tag(name = "StationInfo", description = "정류장 검색 API")
public class StationInfoController {
    private final StationInfoService stationInfoService;

    @GetMapping("/{stationClass}")
    @Operation(
            summary = "정류장 리스트 조회",
            description = "정류장 종류 코드를 기반으로 정류장 리스트를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "정류장 정보 조회 성공", content = @Content(schema = @Schema(implementation = StationDTO.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
                    @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없음", content = @Content),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
        }
    )
    public List<StationDTO> stationInfo(
            @Parameter(description = "정류장 종류 번호 (3 기차역, 4 고속버스, 5 항공, 6 시외버스)", example = "4") @PathVariable String stationClass) {
        return stationInfoService.getStationList(stationClass);
    }
}
