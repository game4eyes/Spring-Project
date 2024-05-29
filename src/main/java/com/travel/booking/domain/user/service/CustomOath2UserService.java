package com.travel.booking.domain.user.service;

import com.travel.booking.domain.user.Custom.CustomOAuth2UserDetails;
import com.travel.booking.domain.user.Custom.GoogleUserDetails;
import com.travel.booking.domain.user.Custom.OAuth2UserInfo;
import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOath2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("getAttributes : {}", oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = null;

        // 구글 로그인 처리
        if (provider.equals("google")) {
            log.info("구글 로그인");
            oAuth2UserInfo = new GoogleUserDetails(oAuth2User.getAttributes());
        }

        // 로그를 통해 user_id 확인
        String providerId = oAuth2UserInfo.getProviderId();
        String userId = oAuth2UserInfo.getProviderId(); // 'sub' 필드를 이메일로 사용
        String loginId = provider + "_" + providerId;
        String name = oAuth2UserInfo.getName();

        log.info("OAuth2UserInfo userId: {}", userId);

        if (userId == null) {
            log.error("userId is null");
        }

        Optional<User> findMember = userRepository.findByEmail(userId); // userId를 email로 사용
        User user;

        if (findMember.isEmpty()) {
            user = User.builder()
                    .email(userId)  // email 필드에 userId 설정
                    .loginId(loginId)
                    .username(name)
                    .provider(provider)
                    .providerId(providerId)
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
        } else {
            user = findMember.get();
        }

        return new CustomOAuth2UserDetails(user, oAuth2User.getAttributes());
    }
}
