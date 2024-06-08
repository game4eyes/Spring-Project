package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.searchdb.entity.Schedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "seat_availability")
public class SeatAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 좌석 가용성을 어떤 스케줄에 적용할 것인지 설정 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId")
    private Schedule schedule;

    // 좌석 가용성을 관리할 날짜를 저장
    @Column(name = "date", nullable = false)
    private LocalDate date;
    // 버스 좌석 가용성 관리 컬럼
    @Column(name = "busSeat")
    private Integer busSeat;
    // 기차 좌석 가용성 관리 컬럼
    private Integer trainStandingFreeSeating;
    private Integer trainGeneral;
    private Integer trainSpecial;
    // 항공 좌석 가용성 관리 컬럼
    private Integer airEconomy;
    private Integer airBusiness;
    private Integer airFirst;
}
