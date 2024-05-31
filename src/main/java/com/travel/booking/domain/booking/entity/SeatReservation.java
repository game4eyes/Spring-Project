package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "seat_reservation")
// 예약한 좌석 관리를 위한 테이블
public class SeatReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 예약한 사용자와의 관계 설정 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    // 예약한 일정과의 관계 설정 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId", nullable = false)
    private Schedule schedule;

    // 관련된 주문과의 관계 설정 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    private Order order;

    // 버스의 경우 좌석 번호를 저장
    @Column(name = "seatMapKey")
    private String seatMapKey;  // For bus seat numbers

    // 항공과 기차의 경우 좌석 등급을 저장
    @Column(name = "seatType")
    private String seatType;

    // 예약 날짜를 저장
    @Column(name = "reservationDate", nullable = false)
    private LocalDate reservationDate;

    // 항공과 기차의 경우 예약한 좌석 수를 저장
    @Column(name = "quantity")
    private Integer quantity;

}
