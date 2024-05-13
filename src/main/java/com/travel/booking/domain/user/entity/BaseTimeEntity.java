package com.travel.booking.domain.user.entity;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {

    @CreatedDate // Entity 생성 시 시간 자동 저장
    private LocalDateTime createdDate;

    @LastModifiedDate // Entity 값 변경 시 시간 자동 저장
    private LocalDateTime modifiedDate;

}
