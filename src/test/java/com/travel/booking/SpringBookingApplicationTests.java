package com.travel.booking;

import com.travel.booking.domain.booking.BookingService;
import com.travel.booking.domain.booking.dto.BookingDTO;
import com.travel.booking.domain.booking.entity.StationClassEnum;
import com.travel.booking.domain.user.dto.JoinReq;
import com.travel.booking.domain.user.repository.UserRepository;
import com.travel.booking.domain.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class SpringBookingApplicationTests {

    @Autowired
    UserService userService;
    @Autowired
    BookingService bookingService;

    @Test
    // 회원가입 테스트
    void contextLoads() {
        JoinReq joinReq = new JoinReq();
        joinReq.setEmail("test@test.com");
        joinReq.setPassword("1234");
        joinReq.setPasswordCheck("1234");
        joinReq.setUsername("test");
        userService.join(joinReq);
    }

    @Test
    // 예약 테스트 (항공)
    void test1() {
        JoinReq joinReq = new JoinReq();
        joinReq.setEmail("test@test.com");
        joinReq.setPassword("1234");
        joinReq.setPasswordCheck("1234");
        joinReq.setUsername("test");
        userService.join(joinReq);
        LocalDateTime now = LocalDateTime.now();
        LocalDate dateOnly = now.toLocalDate();
        LocalTime timeOnly = LocalTime.of(14, 19); // 직접 시간을 설정합니다.

        BookingDTO bookingDTO = BookingDTO.builder()
                .email("test@test.com")
                .startStationId(3300128L)
                .endStationId(3300108L)
                .startStationName("서울")
                .endStationName("부산")
                .stationClass(3L)
                .operator("아시아나항공")
                .grade("이코노미")
                .seatNum(2L)
                .date(dateOnly) // LocalDate 사용
                .time(timeOnly) // LocalTime 사용
                .amount(59800)
                .build();
        bookingService.createBooking(bookingDTO);
        List<Integer> integers = new ArrayList<>();
        integers.add(30);
        integers.add(31);
        BookingDTO bookingDTO1 = BookingDTO.builder()
                .email("test@test.com")
                .startStationId(4000035L)
                .endStationId(3400002L)
                .startStationName("동서울종합터미널")
                .endStationName("강릉고속버스터미널")
                .stationClass(4L)
                .grade("우등")
                .seatNum(2L)
                .date(dateOnly) // LocalDate 사용
                .time(timeOnly) // LocalTime 사용
                .busSeatNum(integers)
                .operator("TRABLE")
                .amount(22800)
                .build();
        bookingService.createBooking(bookingDTO1);
    }

}
