package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.booking.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}