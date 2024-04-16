package com.travel.booking.domain.bus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class BusEntity {

    @Id
    @GeneratedValue
    @Column(name = "")
    private Long id;
}
