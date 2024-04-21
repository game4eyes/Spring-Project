package com.travel.booking.domain.bus;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "BUS")
public class BusEntity {

    @Id
    @GeneratedValue
    @Column(name = "BUS_ID")
    private Long id;

    private int gradeId;        // 버스 등급
    private String gradeName;   // 버스 등급명

    private String terminalId;      // 버스터미널 id
    private String terminalName;    // 버스터미널 명
}
