package com.travel.booking.domain.user.controller;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.annotation.Login;
import com.travel.booking.domain.user.dto.JoinReq;
import com.travel.booking.domain.user.dto.LoginReq;
import com.travel.booking.domain.user.dto.SessionUser;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

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
    @ResponseBody // JSON 응답을 반환하려면 @ResponseBody 사용
    public ResponseEntity<?> login(@RequestBody LoginReq loginRequest, BindingResult bindingResult,
                                     HttpServletRequest request, HttpServletResponse response) {
        // 비어있는 값 검증
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("이메일과 비밀번호는 필수입니다.");
        }

        // 사용자 로그인 시도
        User user = userService.login(loginRequest);

        if (user == null) { // 로그인 실패 시
            return ResponseEntity.status(401).body("이메일 또는 비밀번호가 틀렸습니다.");
        }

        if (bindingResult.hasErrors()) { // 유효성 검증 실패
            return ResponseEntity.badRequest().body("로그인에 실패했습니다.");
        }

        // 세션 생성
        HttpSession session = request.getSession(true);

        // 세션에 사용자 정보 저장
        session.setAttribute("email", user.getEmail());
        session.setAttribute("username", user.getUsername());
        session.setMaxInactiveInterval(1800); // 세션 유효 시간 30분

        // 쿠키에 세션 ID 저장
        Cookie sessionCookie = new Cookie("sessionId", session.getId());
        sessionCookie.setMaxAge(-1); // 브라우저가 닫힐 때 쿠키 삭제
        sessionCookie.setPath("/"); // 모든 경로에서 접근 가능하도록 설정
        response.addCookie(sessionCookie);

        // 쿠키에 사용자 정보 저장
        Cookie emailCookie = new Cookie("email", user.getEmail());
        emailCookie.setMaxAge(1800); // 30분 유효
        emailCookie.setPath("/"); // 모든 경로에서 접근 가능하도록 설정
        response.addCookie(emailCookie);

        Cookie usernameCookie = new Cookie("username", user.getUsername());
        usernameCookie.setMaxAge(1800); // 30분 유효
        usernameCookie.setPath("/"); // 모든 경로에서 접근 가능하도록 설정
        response.addCookie(usernameCookie);

        // 로그인 성공 시 응답
        return ResponseEntity.ok("로그인에 성공했습니다.");
    }


    //@PostMapping("/social-google") // 소셜로그인(구글)
    //public String google(@Login SessionUser user, Model model) {
        // 세션에 저장된 값이 있을 때만 model에 userName 등록
      //  if (user != null) {
      //      model.addAttribute("userName", user.getUsername());
      //  }
      // return "redirect:/oauth2/authorization/google";
    //}

//   @GetMapping("/social-google") // 소셜로그인(구글)
//    public RedirectView google() {
//       return new RedirectView("http://localhost:9090/oauth2/authorization/google");
//    }

    @GetMapping("/social-google")
    public RedirectView redirectToGoogle() {
        return new RedirectView("/oauth2/authorization/google");
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
    public String userInfo(@SessionAttribute(name = "email", required = false) String email, Model model) {
        User loginUser = userService.getLoginUserByEmail(email);

        if (loginUser == null) { // 로그아웃된 경우
            return "redirect:/login";
        }

        model.addAttribute("email", loginUser); // 사용자 정보 추가
        return "info"; // 사용자 정보 페이지
    }

    @GetMapping("/admin") // 관리자 페이지
    public String adminPage(@SessionAttribute(name = "userId", required = false) String email) {
        User loginUser = userService.getLoginUserByEmail(email);

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