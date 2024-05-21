package com.travel.booking.domain.booking;

import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "ORDERS")
public class BookingOrderEntity {

    @Id
    @GeneratedValue
    @Column(name = "ORDER_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;         // 주문상태 (주문완료, 주문취소, 결제대기중)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "BUSBOOK_ID")
    private BusBookingEntity busBooking;

    @ManyToOne
    @JoinColumn(name = "AIRBOOK_ID")
    private AirBookingEntity airBooking;

    @ManyToOne
    @JoinColumn(name = "TRAINBOOK_ID")
    private TrainBookingEntity trainBooking;


    // 비즈니스 로직 들어갈 자리임
}
