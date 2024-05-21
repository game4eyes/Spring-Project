package com.travel.booking.domain.user.entity;

import com.travel.booking.domain.user.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class User {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long id;

    private String username;

    private String password;

    private String email;

    private String picture;

    private Long point;

    @Enumerated(EnumType.STRING)
    private Role role;



}

