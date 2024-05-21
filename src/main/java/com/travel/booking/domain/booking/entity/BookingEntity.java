package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "BOOKING")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    private String startStationName;
    private String endStationName;
    private Date date;
    private Date Time;

    @Enumerated(EnumType.STRING)
    private StationClassEnum stationClassEnum;

    private String grade;
    // 항공, 기차 일 경우
    private Integer seatNum;
    // 버스일 경우
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingBusSeatEntity> bookedSeats;
}
