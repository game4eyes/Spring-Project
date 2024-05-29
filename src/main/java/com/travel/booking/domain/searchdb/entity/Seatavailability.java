package com.travel.booking.domain.searchdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "seatavailability")
public class Seatavailability {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId")
    private Schedule schedule;

    @Column(name = "seatMap")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> seatMap;

}