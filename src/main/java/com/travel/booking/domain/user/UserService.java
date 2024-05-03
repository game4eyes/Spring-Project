package com.travel.booking.domain.user;

import com.travel.booking.security.JoinRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private UserRepo repo;

    @Transactional
    public UserEntity registerUser(String username, String password, String email, int phonenum, String gender, String city, String street, String zipcode) {

        // 새로운 사용자 엔티티 생성
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setPhonenum(phonenum);
        newUser.setGender(gender);
        newUser.setAddress(new Address(city, street, zipcode));

        // 데이터베이스에 저장
        return repo.save(newUser);
    }

    public void checkLoginIdDuplicate(JoinRequest joinRequest, BindingResult bindingResult, Model model){

    }
}
