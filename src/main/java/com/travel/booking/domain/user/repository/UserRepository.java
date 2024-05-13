package com.travel.booking.domain.user.repository;

import com.travel.booking.domain.user.entity.OauthUser;
import com.travel.booking.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByLoginId(String loginId);
    boolean existsByUsername(String username);
    Optional<UserEntity> findByLoginId(String loginId);
}
