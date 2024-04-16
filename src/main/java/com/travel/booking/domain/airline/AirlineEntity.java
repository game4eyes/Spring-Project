package com.travel.booking.domain.airline;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class AirlineEntity {

    @Id
    @GeneratedValue
    @Column(name = "AIRLINE_ID")
    private Long id;


}
