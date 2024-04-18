package com.travel.booking.domain.payment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "PAYMENT")
public class PaymentEntity {

    @Id @GeneratedValue
    @Column(name = "PAYMENT_ID")
    private Long id;
    private String type;    // 결제 방법 (enum 사용할까 고민중)
    private String paydata; // 결재 내용
    private LocalDateTime paytime; // 결제일시

}
