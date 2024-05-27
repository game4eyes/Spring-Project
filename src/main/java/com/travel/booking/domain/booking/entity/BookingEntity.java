package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BOOKING")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOKING_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    private String startStationName;
    private String endStationName;
    private LocalDate date;
    // 출발 시각
    private LocalTime departureTime;
    // 도착 시각
    private LocalTime arrivalTime;

    @Enumerated(EnumType.STRING)
    private StationClassEnum stationClassEnum;
    // 운행사
    // 기차 : 노선 이름
    // ktx 경부선, 무궁화호 등등
    // 항공 : 항공사 이름
    // 예) 아시아나항공, 대한항공 등등
    private String operator;
    // 좌석 등급
    // 기차 일반, 특실/우등, 입석/자유석
    // 항공 이코노미, 비즈니스
    // 버스 버스 종류 일반 우등 등등...
    private String grade;
    // 항공, 기차 일 경우
    private Long seatNum;
    // 버스일 경우
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingBusSeatEntity> bookedSeats;

    public BookingEntity(Long id) {
        this.id = id;
    }
}
