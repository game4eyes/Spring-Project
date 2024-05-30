package com.travel.booking.domain.searchdb;

import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.searchdb.dto.StationInfoDTO;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.entity.Stationinfo;
import com.travel.booking.domain.searchdb.entity.Stationtype;
import com.travel.booking.domain.searchdb.exception.SearchException;
import com.travel.booking.domain.searchdb.exception.SearchExceptionCode;
import com.travel.booking.domain.searchdb.repo.*;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchDBService {
    private final ScheduleRepository scheduleRepository;
    private final SeatavailabilityRepository seatavailabilityRepository;
    private final StationinfoRepository stationinfoRepository;
    private final StationtypeRepository stationtypeRepository;
    private final TrainpriceRepository trainpriceRepository;
    private final UserRepository userRepository;
    private final JpaPaymentRepository jpaPaymentRepository;

    // 각 정차지의 시작 지점을 찾는 메서드
    public ResponseEntity<?> getStationStartList(Long stationTypeId) {
        // stationTypeId에 해당하는 값이 있는지 찾는 메서드
        Stationtype stationType = stationtypeRepository.findById(stationTypeId)
                // StationTypeId에 해당하는 StationType가 없을 경우 예외처리
                .orElseThrow(() -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_STATION_TYPE_FAILED));

        // 찾은 아이디 값
        Long stationId = stationType.getId();

        List<Stationinfo> result = stationinfoRepository.findBusStartListByStationTypeId(stationId);
        // 예외 처리
        if(result.isEmpty()) {
            throw new SearchException(HttpStatus.BAD_REQUEST,SearchExceptionCode.SEARCH_STATION_INFO_FIND_BY_STATION_TYPE_FAILED);
        }

        return ResponseEntity.ok(result);
    }

    // 출발지에 따른 도착지를 찾기 위한 메서드
    public ResponseEntity<?> getStationStopList(Long startStationId) {
        // 시작지 아이디로 스케줄 찾기
        List<Schedule> list = scheduleRepository.findByStartStation_Id(startStationId);
        if (list.isEmpty()) {
            throw new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_FAILED);
        }

        // 도착지 id 중복 제거를 위한 Set
        Set<Long> endId = new HashSet<>();
        for (Schedule schedule : list) {
            endId.add(schedule.getEndStation().getId());
        }

        List<StationInfoDTO> result = new ArrayList<>();
        for (Long id : endId) {
            Stationinfo stationinfo = stationinfoRepository.findById(id)
                    .orElseThrow(() -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_BY_START_STATION_ID_FAILED));
            result.add(new StationInfoDTO(stationinfo));
        }

        return ResponseEntity.ok(result);
    }

}
