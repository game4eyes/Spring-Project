package com.travel.booking.domain.user.entity;

import com.travel.booking.domain.user.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor
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
    private int phonenum;
    private String gender;


    @Enumerated(EnumType.STRING)
    private Role role;

}

