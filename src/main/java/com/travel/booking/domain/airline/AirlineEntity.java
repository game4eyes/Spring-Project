package com.travel.booking.domain.airline;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "AIRLINE")
public class AirlineEntity {

    @Id
    @GeneratedValue
    @Column(name = "AIRLINE_ID")
    private Long id;


}
