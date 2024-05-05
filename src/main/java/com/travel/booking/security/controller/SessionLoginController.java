package com.travel.booking.security.controller;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.dto.JoinReq;
import com.travel.booking.domain.user.dto.LoginReq;
import com.travel.booking.domain.user.entity.UserEntity;
import com.travel.booking.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user") // 고유한 경로로 수정
public class SessionLoginController {

    private final UserService userService;

    @PostMapping("/join") // 경로 지정
    @ResponseBody
    public ResponseEntity<?> join(@Valid @RequestBody JoinReq req, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) { // 유효성 검사 실패
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        if (req.getPassword() == null || req.getPasswordCheck() == null) { // Null 체크
            System.out.println(req.getPassword());
            return ResponseEntity.badRequest().body("비밀번호는 필수입니다.");
        }

        if (!req.getPassword().equals(req.getPasswordCheck())) { // 비밀번호 일치 여부
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        userService.join(req); // 회원가입 처리
        return ResponseEntity.ok("회원가입이 완료되었습니다.");

    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginReq loginRequest, BindingResult bindingResult,
                        HttpServletRequest httpServletRequest) {
        UserEntity user = userService.login(loginRequest);

        if (user == null) { // 로그인 실패 시
            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }

        if (bindingResult.hasErrors()) { // 오류가 있으면 로그인 페이지로
            return "login";
        }

        // 세션 생성 및 관리
        httpServletRequest.getSession().invalidate(); // 기존 세션 파기
        HttpSession session = httpServletRequest.getSession(true); // 새로운 세션 생성
        session.setAttribute("userId", user.getId()); // 세션에 사용자 ID 저장
        session.setMaxInactiveInterval(1800); // 세션 유효 시간 30분

        sessionList.put(session.getId(), session); // 세션을 리스트에 추가

        return "redirect:/session-login"; // 성공 시 리디렉션
    }

    @GetMapping("/logout") // 로그아웃 처리
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 기존 세션 얻기
        if (session != null) { // 세션이 존재하면
            sessionList.remove(session.getId()); // 세션 리스트에서 제거
            session.invalidate(); // 세션 무효화
        }
        return "redirect:/session-login"; // 로그아웃 후 리디렉션
    }

    @GetMapping("/info") // 사용자 정보 페이지
    public String userInfo(@SessionAttribute(name = "userId", required = false) Long userId, Model model) {
        UserEntity loginUser = userService.getLoginUserById(userId);

        if (loginUser == null) { // 로그아웃된 경우
            return "redirect:/session-login/login";
        }

        model.addAttribute("user", loginUser); // 사용자 정보 추가
        return "info"; // 사용자 정보 페이지
    }

    @GetMapping("/admin") // 관리자 페이지
    public String adminPage(@SessionAttribute(name = "userId", required = false) Long userId) {
        UserEntity loginUser = userService.getLoginUserById(userId);

        if (loginUser == null) { // 로그인되지 않은 경우
            return "redirect:/session-login/login";
        }

        if (!loginUser.getRole().equals(Role.ADMIN)) { // 관리자 권한이 없는 경우
            return "redirect:/session-login";
        }

        return "admin"; // 관리자 페이지
    }

    // 세션 리스트 확인용 코드
    public static Hashtable<String, HttpSession> sessionList = new Hashtable<>(); // 제네릭 사용

    @GetMapping("/session-list")
    @ResponseBody
    public Map<String, String> sessionList() {
        Enumeration<HttpSession> elements = sessionList.elements(); // 제네릭 사용
        Map<String, String> lists = new HashMap<>();
        while (elements.hasMoreElements()) {
            HttpSession session = elements.nextElement();
            lists.put(session.getId(), String.valueOf(session.getAttribute("userId")));
        }
        return lists;
    }
}
