package com.travel.booking.domain.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking_by_bus_seat")
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
    private LocalDate date;
    private LocalTime time;
    private String seatNum;
}
