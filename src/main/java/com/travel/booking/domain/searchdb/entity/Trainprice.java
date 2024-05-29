package com.travel.booking.domain.searchdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "trainprice")
public class Trainprice {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainScheduleId")
    private Schedule trainSchedule;

    @Column(name = "general")
    private Integer general;

    @Column(name = "special")
    private Integer special;

}