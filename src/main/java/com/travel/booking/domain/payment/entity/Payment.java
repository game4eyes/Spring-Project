package com.travel.booking.domain.payment.entity;

import com.travel.booking.domain.payment.PayType;
import com.travel.booking.domain.payment.dto.PaymentResDto;
import com.travel.booking.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(indexes = {
        @Index(name = "idx_payment_member", columnList = "customer"),
        @Index(name = "idx_payment_paymentKey", columnList = "paymentKey" ),
})
@EntityListeners(AuditingEntityListener.class)
@Builder
public class Payment  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false, unique = true)
    private Long paymentId;

    @Column(nullable = false , name = "pay_type")
    @Enumerated(EnumType.STRING)
    private PayType payType;

    @Column(nullable = false , name = "pay_amount")
    private Long amount;

    @Column(nullable = false , name = "pay_name")
    private String orderName;

    @Column(nullable = false , name = "order_id")
    private String orderId;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean paySuccessYN;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "CUSTOMER")
    private User customer;

    @Column
    private String paymentKey;

    @Column
    private String failReason;

    @Column(nullable = false)
    private boolean cancelYN;

    @Column
    private String cancelReason;

    @Column
    private String userEmail;

    public PaymentResDto toPaymentResDto() { // DB에 저장하게 될 결제 관련 정보들
        return PaymentResDto.builder()
                .payType(payType.getDescription())
                .amount(amount)
                .orderName(orderName)
                .orderId(orderId)
                .userEmail(customer.getEmail())
                .userName(customer.getUsername())
                .createdAt(String.valueOf(getCreatedAt()))
                .cancelYN(cancelYN)
                .failReason(failReason)
                .build();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
