package com.travel.booking.domain.booking;

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

    private String startStationID;
    private String endStationID;
    private Date date;
    private Date Time;

    @Enumerated(EnumType.STRING)
    private StationClassEnum stationClassEnum;

    private String grade;

    private Integer seatNum;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingBusSeatEntity> bookedSeats;
}
