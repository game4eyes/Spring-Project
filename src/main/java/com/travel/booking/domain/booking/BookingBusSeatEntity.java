package com.travel.booking.domain.booking;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "OrderByBusSeat")
public class BookingBusSeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingEntity booking;

    private Long startStationID;
    private Long endStationID;
    private Date date;
    private Date time;
    private String seatNum;
}
