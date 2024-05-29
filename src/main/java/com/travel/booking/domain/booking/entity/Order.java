package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Log4j2
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "orderDate")
    private LocalDate orderDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "scheduleId", nullable = false)
    private Schedule schedule;
}