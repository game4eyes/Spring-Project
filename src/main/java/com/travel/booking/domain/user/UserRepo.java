package com.travel.booking.domain.user;


import com.travel.booking.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, String>, QuerydslPredicateExecutor<UserEntity> {
    UserEntity findByUsername(String username);
}
