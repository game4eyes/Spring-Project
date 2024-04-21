package com.travel.booking.domain.booking;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "TRAINBOOK")
public class TrainBookingEntity {

    @Id
    @GeneratedValue
    @Column(name = "TRAINBOOK_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private  BookingOrderEntity order;

    private String trainId;     // 기차 id
    private String trainNm;     // 기차 명
    private String deptime;     // 출발시간
    private String arrtime;     // 도착시간
    private int charge;         // 운임

    private String depStation;  // 츨발역명
    private String arrStation;  // 도착역명
    private String stationId;   // 기차역 id

    // 비즈니스 로직
}
