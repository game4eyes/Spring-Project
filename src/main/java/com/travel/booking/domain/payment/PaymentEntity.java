package com.travel.booking.domain.payment;

import com.travel.booking.domain.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.domain.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Table(indexes = {
        @Index(name = "idx_payment_member", columnList = "customer"),
        @Index(name = "idx_payment_paymentKey", columnList = "paymentKey" ),
})
@EntityListeners(AuditingEntityListener.class)
public class PaymentEntity {

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

    private boolean paySuccessYN;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "USERNAME")
    private UserEntity user;

    @Column
    private String paymentKey;


    @Column
    private String failReason;

    @Column
    private boolean cancelYN;

    @Column
    private String cancelReason;

    public PaymentResDTO toPaymentResDto() { // DB에 저장하게 될 결제 관련 정보들
        return PaymentResDTO.builder()
                .payType(payType.getDescription())
                .amount(amount)
                .orderName(orderName)
                .orderId(orderId)
                .customerEmail(user.getEmail())
                .customerName(user.getUsername())
                .createdAt(String.valueOf( ))
                .cancelYN(cancelYN)
                .failReason(failReason)
                .build();
    }

}
