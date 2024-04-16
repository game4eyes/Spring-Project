package com.travel.booking.domain.booking;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "BOOKING")
public class BookingEntity {

    @Id
    @GeneratedValue
    @Column(name = "BOOKING_ID")
    private Long id;
}
