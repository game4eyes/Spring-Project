package com.travel.booking.domain.booking;

import com.travel.booking.domain.booking.dto.BookingDTO;
import com.travel.booking.domain.booking.entity.*;
import com.travel.booking.domain.booking.exception.BookingErrorCode;
import com.travel.booking.domain.booking.exception.BookingException;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingEntityRepository BOOKING_ENTITY_REPOSITORY;
    @Autowired
    private UserService USER_SERVICE;

    public ResponseEntity<?> createBooking(BookingDTO bookingDTO) {
        // 이메일 유효성 검사
        if (bookingDTO.getEmail() == null || bookingDTO.getEmail().isEmpty()) {
            throw new BookingException(
                    HttpStatus.BAD_REQUEST, BookingErrorCode.BOOKING_EMAIL_FAILED
            );
        }

        User user = USER_SERVICE.FindByEmail(bookingDTO.getEmail());
        if (user == null || user.getId() == null) {
            throw new BookingException(
                    HttpStatus.NOT_FOUND, BookingErrorCode.BOOKING_USER_FAILED
            );
        }

        BookingEntity bookingEntity = BookingEntity.builder()
                .user(user)
                .startStationName(bookingDTO.getStartStationName())
                .endStationName(bookingDTO.getEndStationName())
                .date(bookingDTO.getDate())
                .departureTime(bookingDTO.getDepartureTime())
                .arrivalTime(bookingDTO.getArrivalTime())
                .stationClassEnum(StationClassEnum.getEnum(bookingDTO.getStationClass()))
                .seatNum(bookingDTO.getSeatNum())
                .grade(bookingDTO.getGrade())
                .operator(bookingDTO.getOperator())
                .build();

        // 버스 좌석 처리
        if(bookingDTO.getBusSeatNum() != null && !bookingDTO.getBusSeatNum().isEmpty()) {
            List<BookingBusSeatEntity> seats = bookingDTO.getBusSeatNum().stream()
                    .map(seatNum -> {
                        BookingBusSeatEntity seat = BookingBusSeatEntity.builder()
                                .booking(bookingEntity)
                                .startStationId(bookingDTO.getStartStationId())
                                .endStationId(bookingDTO.getEndStationId())
                                .date(bookingDTO.getDate())
                                .arrivalTime(bookingDTO.getArrivalTime())
                                .departureTime(bookingDTO.getDepartureTime())
                                .seatNum(seatNum.toString())
                                .build();
                        return seat;
                    }).collect(Collectors.toList());
            bookingEntity.setBookedSeats(seats);
        }
        BOOKING_ENTITY_REPOSITORY.save(bookingEntity);
        return ResponseEntity.ok("예약이 완료되었습니다.");
    }
}
