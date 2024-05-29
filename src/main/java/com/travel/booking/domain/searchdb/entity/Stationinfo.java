package com.travel.booking.domain.searchdb.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "stationinfo")
public class Stationinfo {
    @Id
    @Column(name = "stationId", nullable = false)
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "stationName", nullable = false)
    private String stationName;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stationType", nullable = false)
    private Stationtype stationType;

    @NotNull
    @Column(name = "x", nullable = false)
    private Double x;

    @NotNull
    @Column(name = "y", nullable = false)
    private Double y;

}