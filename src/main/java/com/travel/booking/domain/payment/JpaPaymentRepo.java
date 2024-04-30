package com.travel.booking.domain.payment;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaPaymentRepo extends JpaRepository<PaymentEntity, Long> {

    Optional<PaymentEntity> findByOrderId(String orderId);

    Optional<PaymentEntity> findByPaymentKeyAndUser_Email(String paymentKey, String email);

    Slice<PaymentEntity> findAllByUser_Email(String email, Pageable pageable);
}
