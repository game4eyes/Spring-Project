package com.travel.booking.domain.odsay.train;


import com.travel.booking.domain.odsay.train.DTO.ResultDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay/api/train")
@Tag(name = "TrainInfo", description = "기차 검색 API")
public class TrainInfoController {
    private final TrainInfoServiceImpl trainInfoService;

    @Operation(
            summary = "기자 정보 조회",
            description = "출발지와 도착지 기차역 ID, 시간, 요일을 기반으로 항공 정보를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "기차 정보 조회 성공", content = @Content(schema = @Schema(implementation = ResultDTO.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
                    @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없음", content = @Content),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
            }
    )
    @GetMapping("/{startStationID}/{endStationID}")
    public ResultDTO getTrainInfo(
            @Parameter(description = "출발지 기차 ID", example = "3300128") @PathVariable String startStationID,
            @Parameter(description = "도착지 기차 ID", example = "3300108") @PathVariable String  endStationID,
            @Parameter(description = "24시간 표기법 시간", example = "14") @RequestParam Long hour,
            @Parameter(description = "요일(일, 월, 화, 수, 목, 금, 토)",example = "월") @RequestParam char dayz) {
        return trainInfoService.getFilterTrainInfo(startStationID,endStationID,hour,dayz);
    }
}
