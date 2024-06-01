package com.travel.booking.domain.booking;

import com.travel.booking.domain.booking.dto.OrderDto;
import com.travel.booking.domain.booking.dto.PaySuccessOrFailDTO;
import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.booking.entity.SeatAvailability;
import com.travel.booking.domain.booking.exception.BookingErrorCode;
import com.travel.booking.domain.booking.exception.BookingException;
import com.travel.booking.domain.booking.repo.OrderRepository;
import com.travel.booking.domain.booking.repo.SeatAvailabilityRepository;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.exception.SearchException;
import com.travel.booking.domain.searchdb.exception.SearchExceptionCode;
import com.travel.booking.domain.searchdb.repo.ScheduleRepository;
import com.travel.booking.domain.searchdb.repo.StationinfoRepository;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final OrderRepository orderRepository;
    private final SeatAvailabilityRepository seatAvailabilityRepository;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final StationinfoRepository stationinfoRepository;

    // 결제 이전의 로직
    public ResponseEntity<?> insertOrder(OrderDto orderDto) {
        System.out.println(orderDto.getUserEmail());
        User user = userRepository.findByEmail(orderDto.getUserEmail())
                .orElseThrow(() -> new BookingException(HttpStatus.NOT_FOUND, BookingErrorCode.BOOKING_USER_FAILED));
        Schedule schedule = scheduleRepository.findById(orderDto.getScheduleId())
                .orElseThrow(
                        () -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED)
                );
        Optional<Order> checkOrderDate = orderRepository.findById(orderDto.getOrderId());
        if(checkOrderDate.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 해당 예약 건이 있습니다. 추가로 예약 할 것인지?");
        } else {
            Order order = new Order();
            order.setId(orderDto.getOrderId());
            order.setOrderDate(orderDto.getOrderDate());
            order.setUser(user);
            order.setSchedule(schedule);
            order.setOrderStatus("결제 이전");
            order.setGrade(orderDto.getGrade());
            order.setOrderSeatNum(orderDto.getSeatOrderNum());
            orderRepository.save(order);
        }
        SeatAvailability seatAvailability = seatAvailabilityRepository.findByScheduleAndDate(schedule,orderDto.getOrderDate())
                .orElseThrow(
                        ()-> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_SEAT_FAILED)
                );
        switch (orderDto.getGrade()) {
            case "First" -> {
                Integer seatNum = seatAvailability.getAirFirst();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setAirFirst(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "Economy" -> {
                Integer seatNum = seatAvailability.getAirEconomy();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setAirEconomy(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "Business" -> {
                Integer seatNum = seatAvailability.getAirBusiness();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setAirBusiness(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "StandingFreeSeating" -> {
                Integer seatNum = seatAvailability.getTrainStandingFreeSeating();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setTrainStandingFreeSeating(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "General" -> {
                Integer seatNum = seatAvailability.getTrainGeneral();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setTrainGeneral(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "Special" -> {
                Integer seatNum = seatAvailability.getTrainSpecial();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setTrainSpecial(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
            case "Bus" -> {
                Integer seatNum = seatAvailability.getBusSeat();
                seatNum = seatNum - orderDto.getSeatOrderNum();
                seatAvailability.setBusSeat(seatNum);
                seatAvailabilityRepository.save(seatAvailability);
            }
        }
        return ResponseEntity.ok().body(true);
    }

    // 결제 성공 로직
    public ResponseEntity<?> paySuccess(PaySuccessOrFailDTO paySuccessOrFailDTO) {
        User user = userRepository.findByEmail(paySuccessOrFailDTO.getUserEmail())
                .orElseThrow(
                        () -> new BookingException(HttpStatus.BAD_REQUEST, BookingErrorCode.BOOKING_USER_FAILED)
                );
        Order order = orderRepository.findByIdAndUser(paySuccessOrFailDTO.getOrderId(), user)
                .orElseThrow(
                        () -> new BookingException(HttpStatus.NOT_FOUND, BookingErrorCode.UNKNOWN)
                );
        order.setOrderStatus("결제 완료");
        orderRepository.save(order);
        return ResponseEntity.ok().body(true);
    }

    // 결제 실패 로직
    public ResponseEntity<?> payFail(PaySuccessOrFailDTO paySuccessOrFailDTO) {
        User user = userRepository.findByEmail(paySuccessOrFailDTO.getUserEmail())
                .orElseThrow(
                        () -> new BookingException(HttpStatus.BAD_REQUEST, BookingErrorCode.BOOKING_USER_FAILED)
                );
        Order order = orderRepository.findByIdAndUser(paySuccessOrFailDTO.getOrderId(), user)
                .orElseThrow(
                        () -> new BookingException(HttpStatus.NOT_FOUND, BookingErrorCode.UNKNOWN)
                );
        Schedule schedule = scheduleRepository.findById(order.getSchedule().getId())
                .orElseThrow(
                        () -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_FIND_SCHEDULE_FAILED)
                );
        SeatAvailability seat = seatAvailabilityRepository.findByScheduleAndDate(schedule,order.getOrderDate())
                .orElseThrow(
                        () -> new SearchException(HttpStatus.BAD_REQUEST, SearchExceptionCode.SEARCH_SEAT_FAILED)
                );
        switch (order.getGrade()) {
            case "First" -> {
                Integer seatNum = seat.getAirFirst();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setAirFirst(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "Economy" -> {
                Integer seatNum = seat.getAirEconomy();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setAirEconomy(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "Business" -> {
                Integer seatNum = seat.getAirBusiness();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setAirBusiness(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "StandingFreeSeating" -> {
                Integer seatNum = seat.getTrainStandingFreeSeating();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setTrainStandingFreeSeating(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "General" -> {
                Integer seatNum = seat.getTrainGeneral();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setTrainGeneral(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "Special" -> {
                Integer seatNum = seat.getTrainSpecial();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setTrainSpecial(seatNum);
                seatAvailabilityRepository.save(seat);
            }
            case "Bus" -> {
                Integer seatNum = seat.getBusSeat();
                seatNum = seatNum + order.getOrderSeatNum();
                seat.setBusSeat(seatNum);
                seatAvailabilityRepository.save(seat);
            }
        }
        orderRepository.delete(order);
        return ResponseEntity.ok().body(true);
    }

}
