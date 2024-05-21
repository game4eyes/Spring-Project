package com.travel.booking.domain.booking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "BookingByBusSeat")
public class BookingBusSeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOKBUSSEAT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingEntity booking;

    private Long startStationId;
    private Long endStationId;
    private Date date;
    private Date time;
    private String seatNum;
}
