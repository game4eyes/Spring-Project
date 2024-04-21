package com.travel.booking.domain.booking;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class AirBookingEntity {

    @Id
    @GeneratedValue
    @Column(name = "AIRBOOK_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private BookingOrderEntity order;

    private String vehicleId;       // 항공기Id
    private String airlineNm;       // 항공사이름
    private LocalDateTime deptime;  // 출발시간
    private LocalDateTime arrtime;  // 도착시간
    private int charge;             // 항공운임

    private String depAirport;      // 출발 공항이름
    private String arrAirport;      // 도착 공항이름

    ///// 밑에는 로직 쓸거임
}
