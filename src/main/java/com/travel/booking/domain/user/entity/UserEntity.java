package com.travel.booking.domain.user.entity;

import com.travel.booking.domain.user.Role;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long id;

    private String loginId;

    private String username;

    private String password;

    private String email;

    private String birth;
    private String phonenum;
    private String gender;


    @Enumerated(EnumType.STRING)
    private Role role;

}

