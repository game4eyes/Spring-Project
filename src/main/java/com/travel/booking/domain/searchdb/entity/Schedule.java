package com.travel.booking.domain.searchdb.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "departureTime")
    private LocalTime departureTime;

    @Column(name = "arrivalTime")
    private LocalTime arrivalTime;

    @Size(max = 255)
    @Column(name = "frequency")
    private String frequency;

    @Column(name = "price")
    private Integer price;

    @Size(max = 255)
    @Column(name = "carrier")
    private String carrier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "startStationId")
    private Stationinfo startStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endStationId")
    private Stationinfo endStation;

}