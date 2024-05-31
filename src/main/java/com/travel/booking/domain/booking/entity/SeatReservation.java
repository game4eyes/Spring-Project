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
public class SeatReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId", nullable = false)
    private Schedule schedule;

    @Column(name = "seatMapKey")
    private String seatMapKey;  // For bus seat numbers

    @Column(name = "seatType")
    private String seatType;  // For flight and train seat classes

    @Column(name = "reservationDate", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "quantity")
    private Integer quantity;  // For number of seats in flight and train

    // Constructors, Getters, Setters
}
