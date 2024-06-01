package com.travel.booking.domain.searchdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.Map;

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

    // 좌석 상태를 JSON 형태로 저장 (좌석 번호 또는 등급별 가용성/수량)
    @Column(name = "seatMap")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> seatMap;
}
