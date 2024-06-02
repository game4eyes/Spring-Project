package com.travel.booking.domain.booking.repo;

import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, String> {

    @Override
    Optional<Order> findById(String s);

    Optional<Order> findByOrderIdAndUser(String id, User user);

    long deleteByIdAndUser(String id, User user);
}