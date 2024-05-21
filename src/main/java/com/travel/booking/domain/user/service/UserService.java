package com.travel.booking.domain.user.service;

import com.travel.booking.domain.user.entity.User;
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
    public boolean checkEmailDuplicate(String email){
        return userRepository.existsByEmail(email);
    }

    // 회원가입
    // 비밀번호 암호화해서 저장
    public void join(JoinReq req){
        if (checkEmailDuplicate(req.getEmail())) {
            throw new RuntimeException("이메일이 중복됩니다."); // 중복 체크 오류 처리
        }
        // 비밀번호 암호화
        String encodedPassword = encoder.encode(req.getPassword());
        System.out.println(req.getPassword());
        // `UserEntity`로 변환하여 저장
        User user = req.toEntity(encodedPassword);

        userRepository.save(user); // 데이터베이스 저장
    }


    // 로그인 기능
    public User login(LoginReq req){
        Optional<User> optionalUser = userRepository.findByEmail(req.getEmail());

        // id와 일치하는 user가 없으면 null return
        if(optionalUser.isEmpty()){
            return null;
        }

        User user = optionalUser.get();

        // 찾아온 User의 password와 입력된 패스워드가 다르면 null return
        // 암호화된 비밀번호와 입력된 비밀번호를 비교
        if (!encoder.matches(req.getPassword(), user.getPassword())) { // 올바른 비교 방식
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
    public User getLoginUserByEmail(Long id){
        if(id == null) return null;

        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    public User FindByEmail(String email){
        if(email == null) return null;

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    public User verifyMember(String username){
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isPresent()){
            return userOptional.get();
        } else {
            // 사용자를 찾을 수 없는경우 예외처리
            throw new RuntimeException("사용자를 찾을 수 없습니다" + username);
        }
    }

}
