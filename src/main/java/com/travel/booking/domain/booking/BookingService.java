package com.travel.booking.domain.booking;

import com.travel.booking.domain.booking.dto.BookingDTO;
import com.travel.booking.domain.booking.entity.*;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import com.travel.booking.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingEntityRepository BOOKING_ENTITY_REPOSITORY;
    @Autowired
    private BookingBusSeatEntityRepository BOOKING_BUS_SEAT_ENTITY_REPOSITORY;
    @Autowired
    private UserRepository USER_REPOSITORY;
    @Autowired
    private UserService USER_SERVICE;

    public void createBooking(BookingDTO bookingDTO) {
        User user = USER_SERVICE.FindByEmail(bookingDTO.getEmail());
        BookingEntity bookingEntity = BookingEntity.builder()
                .user(user)
                .startStationName(bookingDTO.getStartStationName())
                .endStationName(bookingDTO.getEndStationName())
                .date(bookingDTO.getDate())
                .time(bookingDTO.getTime())
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
                                .time(bookingDTO.getTime())
                                .seatNum(seatNum.toString())
                                .build();
                        return seat;
                    }).collect(Collectors.toList());
            bookingEntity.setBookedSeats(seats);
        }
        BOOKING_ENTITY_REPOSITORY.save(bookingEntity);
    }
}
