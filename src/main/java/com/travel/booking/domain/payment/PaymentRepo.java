package com.travel.booking.domain.payment;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PaymentRepo {

    @Autowired
    private final EntityManager em;

    public void save(PaymentEntity payment) {
        em.persist(payment);
    }



}
