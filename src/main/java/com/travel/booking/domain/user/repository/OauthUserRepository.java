package com.travel.booking.domain.user.repository;

import com.travel.booking.domain.user.entity.OauthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OauthUserRepository extends JpaRepository<OauthUser, Long> {
    // 소셜 로그인으로 반환되는 값 중 email을 통해 이미 생성된 사용자인지 처음 가입되는 사용자인지 판단하기 위한 메서드
    Optional<OauthUser> findByEmail(String email);


}
