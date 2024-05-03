package com.travel.booking.domain.user.service;

import com.travel.booking.domain.user.entity.UserEntity;
import com.travel.booking.domain.user.dto.JoinReq;
import com.travel.booking.domain.user.dto.LoginReq;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    // 회원가입 시 login id 중복체크
    // 중복시 true 리턴
    public boolean checkLoginIdDuplicate(String loginId){
        return userRepository.existsByLoginId(loginId);
    }

    // 회원가입
    // 비밀번호 암호화해서 저장
    public void join(JoinReq req){
        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
    }


    // 로그인 기능
    public UserEntity login(LoginReq req){
        Optional<UserEntity> optionalUser = userRepository.findByLoginId(req.getLoginId());

        // id와 일치하는 user가 없으면 null return
        if(optionalUser.isEmpty()){
            return null;
        }

        UserEntity user = optionalUser.get();

        // 찾아온 User의 password와 입력된 패스워드가 다르면 null return
        if(!user.getPassword().equals(req.getPassword())){
            return null;
        }

        return user;
    }

    /*
     * id(Long)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * userId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * userId로 찾아온 User가 존재하면 User return
     */
    public UserEntity getLoginUserById(Long id){
        if(id == null) return null;

        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }


    /*
     * loginId(String)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * loginId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * loginId로 찾아온 User가 존재하면 User return
     */
    public UserEntity getLoginUserByLoginId(String loginId) {
        if(loginId == null) return null;

        Optional<UserEntity> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}
