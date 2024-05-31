package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.searchdb.entity.Schedule;
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
@Table(name = "seatavailability")
public class SeatAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId")
    private Schedule schedule;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "seatMap")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> seatMap;  // Key: seat number or class, Value: availability or count
}
