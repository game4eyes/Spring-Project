package com.travel.booking.domain.booking;

import com.travel.booking.domain.odsay.bus.DTO.BusType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "BUSBOOK")
public class BusBookingEntity {

    @Id
    @GeneratedValue
    @Column(name = "BUSBOOK_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private BookingOrderEntity order;

    private String busId;       // 버스 id
    private String busNm;       // 버스명
    private String deptime;     // 출발시간
    private String arrtime;     // 도착시간
    private String charge;      // 운임

    private String depBusStation;   // 출발 버스역
    private String arrBusStation;   // 도착 버스역

    @Enumerated(EnumType.STRING)
    private BusType grade;         // 버스 등급

}
