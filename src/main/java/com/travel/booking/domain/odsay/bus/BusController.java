package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.bus.DTO.ResultDTO;
import com.travel.booking.domain.odsay.bus.DTO.ScheduleResultDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay/api/bus")
@Tag(name = "Bus", description = "버스 정보 및 스케줄 API")
public class BusController {
    private final BusService busService;

    @Operation(
            summary = "모든 버스 정보 조회",
            description = "터미널 클래스와 도시 코드를 기반으로 모든 버스 정보를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "버스 정보 조회 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ResultDTO.class)))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
                    @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없음", content = @Content),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
            }
    )
    @GetMapping
    public List<ResultDTO> getAllBus(
            @Parameter(description = "터미널 클래스 (4: 고속버스, 6: 시외버스)", example = "4") @RequestParam Long stationClass,
            @Parameter(description = "도시 코드", example = "1000(서울)") @RequestParam String cityCode) {
        return busService.getBusTerminal(stationClass, cityCode);
    }

    @Operation(
            summary = "버스 스케줄 조회",
            description = "출발지와 도착지 터미널 ID를 기반으로 버스 스케줄을 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "버스 스케줄 조회 성공", content = @Content(schema = @Schema(implementation = ScheduleResultDTO.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
                    @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없음", content = @Content),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
            }
    )
    @GetMapping("/schedule")
    public ScheduleResultDTO getBusSchedule(
            @Parameter(description = "출발지 터미널 ID", example = "4000035(동서울종합터미널)") @RequestParam Long startStationID,
            @Parameter(description = "도착지 터미널 ID", example = "3400002(강릉고속버스터미널)") @RequestParam Long endStationID) {
        return busService.getSchedule(startStationID, endStationID);
    }
}
