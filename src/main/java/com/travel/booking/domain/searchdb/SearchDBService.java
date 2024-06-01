package com.travel.booking.domain.searchdb;

import com.travel.booking.domain.booking.repo.SeatAvailabilityRepository;
import com.travel.booking.domain.booking.repo.SeatReservationRepository;
import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.searchdb.dto.BusScheduleDTO;
import com.travel.booking.domain.searchdb.dto.ScheduleDTO;
import com.travel.booking.domain.searchdb.dto.StationInfoDTO;
import com.travel.booking.domain.searchdb.dto.TrainPriceDTO;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.entity.Stationinfo;
import com.travel.booking.domain.searchdb.entity.Stationtype;
import com.travel.booking.domain.searchdb.entity.Trainprice;
import com.travel.booking.domain.searchdb.exception.SearchException;
import com.travel.booking.domain.searchdb.exception.SearchExceptionCode;
import com.travel.booking.domain.searchdb.repo.*;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchDBService {
    private final ScheduleRepository scheduleRepository;
    private final StationinfoRepository stationinfoRepository;
    private final StationtypeRepository stationtypeRepository;
    private final TrainpriceRepository trainpriceRepository;
    private final UserRepository userRepository;
    private final JpaPaymentRepository jpaPaymentRepository;
    private final SeatReservationRepository seatReservationRepository;
    private final SeatAvailabilityRepository seatAvailabilityRepository;

    // 각 정차지의 시작 지점을 찾는 메서드
    public ResponseEntity<?> getStationStartList(Long stationTypeId) {
        // stationTypeId에 해당하는 값이 있는지 찾는 메서드
        Stationtype stationType = stationtypeRepository.findById(stationTypeId)
                // StationTypeId에 해당하는 StationType가 없을 경우 예외처리
                .orElseThrow(() -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_STATION_TYPE_FAILED));
        // 찾은 아이디 값
        Long stationId = stationType.getId();
        // 도착지 id를 찾기 위한 메서드
        List<Stationinfo> findStationInfo = stationinfoRepository.findByStationType_IdOrderById(stationId);
        return ResponseEntity.ok(findStationInfo);
    }

    // 출발지에 따른 도착지를 찾기 위한 메서드
    public ResponseEntity<?> getStationStopList(Long startStationId) {
        // 시작지 아이디로 스케줄 찾기
        List<Schedule> list = scheduleRepository.findByStartStation_IdOrderByIdDesc(startStationId);
        if (list.isEmpty()) {
            throw new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_FAILED);
        }

        // 도착지 id 중복 제거를 위한 Set
        TreeSet<Long> endId = new TreeSet<>();
        for (Schedule schedule : list) {
            endId.add(schedule.getEndStation().getId());
        }
        System.out.println(endId);

        List<StationInfoDTO> result = new ArrayList<>();
        for (Long id : endId) {
            Stationinfo stationinfo = stationinfoRepository.findById(id)
                    .orElseThrow(() -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_BY_START_STATION_ID_FAILED));
            result.add(new StationInfoDTO(stationinfo));
        }

        return ResponseEntity.ok(result);
    }

    public ResponseEntity<?> getSchedules(Long startStationId, Long endStationId,
                                          String weekdayCarrier, String departureTime) {
        List<Schedule> list = scheduleRepository.findByStartStation_IdAndEndStation_IdAndDepartureTimeGreaterThanEqual(startStationId, endStationId, departureTime);
        TreeSet<Long> ids = new TreeSet<>();
        for (Schedule schedule : list) {
            ids.add(schedule.getId());
        }
        List<ScheduleDTO> result = new ArrayList<>();
        Long count = 0L;
        String daily = "매일";
        for (Long id : ids) {
            Schedule schedule = scheduleRepository.findById(id)
                    .orElseThrow(() -> new SearchException(
                            HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED
                    ));
            if (schedule.getCarrier().contains(daily) || schedule.getCarrier().contains(weekdayCarrier)) {
                result.add(new ScheduleDTO(schedule));
                count++;
            }
        }
        Map<String, Object> send = new HashMap<>();
        send.put("count", count);
        send.put("result", result);
        return ResponseEntity.ok(send);
    }

    public ResponseEntity<?> getBusSchedule(Long startStationId, Long endStationId,
                                            String gradeCarrier, String departureTime) {
        List<Schedule> list = scheduleRepository.findByStartStation_IdAndEndStation_IdAndDepartureTimeGreaterThanEqualOrderById(startStationId,endStationId,departureTime);
        TreeSet<Long> ids = new TreeSet<>();
        for (Schedule schedule : list) {
            ids.add(schedule.getId());
        }
        List<BusScheduleDTO> result = new ArrayList<>();
        Long count = 0L;
        for (Long id : ids) {
            Schedule schedule = scheduleRepository.findById(id)
                    .orElseThrow(() -> new SearchException(
                            HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED
                    ));
            if(schedule.getCarrier().equals(gradeCarrier) || gradeCarrier.equals("전체")) {
                result.add(new BusScheduleDTO(schedule));
                count++;
            }
        }
        Map<String, Object> send = new HashMap<>();
        send.put("count", count);
        send.put("result", result);
        return ResponseEntity.ok(send);
    }

    public ResponseEntity<?> getTrainPrice(Long id) {
        Trainprice trainprice = trainpriceRepository.findByTrainSchedule_Id(id)
                .orElseThrow(() -> new SearchException(
                        HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_TRAIN_PRICE_FAILED
                ));

        return ResponseEntity.ok(new TrainPriceDTO(trainprice));
    }
}
