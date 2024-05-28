package com.travel.booking.domain.user.service;

import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GoogleService {

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;


    public GoogleService(RestTemplateBuilder restTemplateBuilder, UserRepository userRepository) {
        this.restTemplate = restTemplateBuilder.build();
        this.userRepository = userRepository;
    }

    public void socialLogin(String code, String registrationId) {
        String tokenUri = "https://oauth2.googleapis.com/token";
        String userInfoUri = "https://www.googleapis.com/oauth2/v3/userinfo";

        // 코드로 액세스 토큰 교환
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUri, request, Map.class);
        String accessToken = (String) response.getBody().get("access_token");

        // 사용자 정보 가져오기
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);

        HttpEntity<?> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUri, HttpMethod.GET, userInfoRequest, Map.class);

        // 사용자 정보 처리 및 데이터베이스에 저장
        Map<String, Object> userAttributes = userInfoResponse.getBody();
        String email = (String) userAttributes.get("email");

        // 예시: 데이터베이스에 사용자 저장 또는 업데이트
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> new User(email));
        user.setUsername((String) userAttributes.get("name"));
        userRepository.save(user);
    }
}
