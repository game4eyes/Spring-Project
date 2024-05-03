package com.travel.booking.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Table(name = "USERS")
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private String id;
    @Column(name = "USERNAME")
    private String username;
    private String password;
    private String email;
    private int phonenum;
    private String gender;

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    private PublicStatus publicStatus;

    @Enumerated(EnumType.STRING)
    private Role role;

}

