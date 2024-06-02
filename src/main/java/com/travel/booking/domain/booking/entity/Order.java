package com.travel.booking.domain.booking.entity;

import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Log4j2
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    @Column
    private Long id;

    @Column(name = "orderId", nullable = false)
    private String orderId;

    // 주문을 한 사용자와의 관계 설정 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    // 주문 날짜를 저장 (생성 시 자동 설정)
    @CreatedDate
    @Column(name = "orderDate", nullable = false)
    private LocalDate orderDate;

    // 주문 상태를 저장 (예: 결제 전, 결제 완료, 사용 완료)
    @Column(name = "orderStatus", nullable = false)
    private String orderStatus;

    //  주문 스케쥴
    @JoinColumn(name = "scheduleId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Schedule schedule;

    // 좌석 등급
    @Column(name = "orderGrade", nullable = false)
    private String grade;
    // 예약한 좌석의 수
    @Column(name = "orderSeatNum", nullable = false)
    private Integer orderSeatNum;

    // 주문과 관련된 결제 정보와의 관계 설정 (1:1)
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;

    public Order() {}

    public Order(User user, LocalDate orderDate, String orderStatus) {
        this.user = user;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
    }
}
