package com.travel.booking.domain.booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class BookingEntity {

    @Id
    @GeneratedValue
    @Column(name = "BOOKING_ID")
    private Long id;
}
