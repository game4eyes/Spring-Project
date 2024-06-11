package com.travel.booking.domain.searchdb;

import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.booking.entity.SeatAvailability;
import com.travel.booking.domain.booking.repo.OrderRepository;
import com.travel.booking.domain.booking.repo.SeatAvailabilityRepository;
import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.searchdb.dto.*;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.entity.Stationinfo;
import com.travel.booking.domain.searchdb.entity.Stationtype;
import com.travel.booking.domain.searchdb.entity.Trainprice;
import com.travel.booking.domain.searchdb.exception.SearchException;
import com.travel.booking.domain.searchdb.exception.SearchExceptionCode;
import com.travel.booking.domain.searchdb.repo.*;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
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
    private final SeatAvailabilityRepository seatAvailabilityRepository;
    private final OrderRepository orderRepository;

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
    // 예약 날짜의 좌석 데이터가 없으면 생성하는 로직
    private SeatAvailability getOrCreateSeatAvailability(Schedule schedule, LocalDate date, Long type) {
        Optional<SeatAvailability> seatAvailabilityOpt = seatAvailabilityRepository.findByScheduleAndDate(schedule,date);
        if (seatAvailabilityOpt.isPresent()) {
            return seatAvailabilityOpt.get();
        } else {
            SeatAvailability seatAvailability = new SeatAvailability();
            seatAvailability.setSchedule(schedule);
            seatAvailability.setDate(date);
            if (type == 1) {
                seatAvailability.setBusSeat(40);
            } else if (type == 2) {
                seatAvailability.setAirBusiness(100);
                seatAvailability.setAirEconomy(100);
                seatAvailability.setAirFirst(100);
            } else if (type == 3) {
                seatAvailability.setTrainGeneral(100);
                seatAvailability.setTrainStandingFreeSeating(100);
                seatAvailability.setTrainSpecial(100);
            }
            seatAvailabilityRepository.save(seatAvailability);
            return seatAvailability;
        }
    }

    // 남은 좌석의 상태 확인
    public ResponseEntity<?> getSeatAvailability(Long scheduleId, LocalDate date) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(
                        () -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED)
                );
        Stationinfo stationinfo = stationinfoRepository.findById(schedule.getStartStation().getId())
                .orElseThrow(
                        ()-> new SearchException(HttpStatus.BAD_REQUEST,SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_FAILED)
                );
        Long stationType = stationinfo.getStationType().getId();
        SeatAvailability seat = getOrCreateSeatAvailability(schedule, date,stationType);

        return ResponseEntity.ok(new resultDTO(stationType,seat));
    }

    // 예약 정보 확인
    // 결제 완료된 건에 대해서만 반환
    public ResponseEntity<?> getUserOrderList(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        List<Order> userOrderList = orderRepository.findByUser(user);
        if (userOrderList.isEmpty()) {
            String message = "주문 내역이 없숭둥...";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        } else {
            List<OrderInfoResultDTO> orderInfoResultDTOList = new ArrayList<>();
            for (Order order : userOrderList) {
                if (!"결제 완료".equals(order.getOrderStatus())) {
                    continue;
                }
                Schedule schedule = scheduleRepository.findById(order.getSchedule().getId())
                        .orElseThrow(
                                () -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED)
                        );
                Stationinfo startStation = stationinfoRepository.findById(schedule.getStartStation().getId())
                        .orElseThrow(
                                () -> new SearchException(HttpStatus.NOT_FOUND, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_FAILED)
                        );
                Stationinfo endStation = stationinfoRepository.findById(schedule.getEndStation().getId())
                        .orElseThrow(
                                () -> new SearchException(HttpStatus.NOT_FOUND, SearchExceptionCode.SEARCH_START_STATION_INFO_FIND_FAILED)
                        );
                OrderInfoResultDTO orderInfoResultDTO = OrderInfoResultDTO.fromOrderAndSchedule(order, schedule, startStation, endStation);
                orderInfoResultDTOList.add(orderInfoResultDTO);
            }
            // 결제 완료된 주문 내역이 없는 경우 처리
            if (orderInfoResultDTOList.isEmpty()) {
                String message = "결제 완료된 주문 내역이 없습니다.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
            Map<String,Object> result = new HashMap<>();
            result.put("count", orderInfoResultDTOList.size());
            result.put("OrderList", orderInfoResultDTOList);
            return ResponseEntity.ok(result);
        }
    }
}
