package com.travel.booking.domain.user.controller;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.dto.JoinReq;
import com.travel.booking.domain.user.dto.LoginReq;
import com.travel.booking.domain.user.dto.UpdateReq;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class SessionLoginController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody JoinReq req) {
        if (req.getPassword() == null || req.getPasswordCheck() == null) {
            return ResponseEntity.badRequest().body("비밀번호는 필수입니다.");
        }

        if (!req.getPassword().equals(req.getPasswordCheck())) {
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        userService.join(req);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReq loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                return ResponseEntity.badRequest().body("이메일과 비밀번호는 필수입니다.");
            }

            User user = userService.login(loginRequest);

            if (user == null) {
                return ResponseEntity.status(401).body("이메일 또는 비밀번호가 틀렸습니다.");
            }

            HttpSession session = request.getSession(true);
            session.setAttribute("email", user.getEmail());
            session.setAttribute("username", user.getUsername());
            session.setMaxInactiveInterval(1800);

            Cookie sessionCookie = new Cookie("sessionId", session.getId());
            sessionCookie.setMaxAge(-1);
            sessionCookie.setPath("/");
            response.addCookie(sessionCookie);

            Cookie emailCookie = new Cookie("email", user.getEmail());
            emailCookie.setMaxAge(1800);
            emailCookie.setPath("/");
            response.addCookie(emailCookie);

            Cookie usernameCookie = new Cookie("username", user.getUsername());
            usernameCookie.setMaxAge(1800);
            usernameCookie.setPath("/");
            response.addCookie(usernameCookie);

            return ResponseEntity.ok("로그인에 성공했습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 에러: " + e.getMessage());
        }
    }

    @GetMapping("/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error, Model model) {
        if (error != null) {
            model.addAttribute("loginError", "이메일 또는 비밀번호가 틀렸습니다.");
        }
        return "login"; // 로그인 페이지의 뷰 이름
    }

    @PostMapping("/update")
    public String updateUserInfo(@Valid UpdateReq updateReq, Model model, Error error){

        userService.update(updateReq);

        return "info";
    }





//    @GetMapping("/info")
//    public String userInfo(@SessionAttribute(name = "email", required = false) String email, Model model) {
//        User loginUser = userService.getLoginUserByEmail(email);
//
//        if (loginUser == null) {
//            return "redirect:/api/user/login";
//        }
//
//        model.addAttribute("email", loginUser);
//        return "info";
//    }

//    @GetMapping("/info")
//    public String userInfo(@Valid)


    public static Hashtable<String, HttpSession> sessionList = new Hashtable<>();

    @GetMapping("/session-list")
    @ResponseBody
    public Map<String, String> sessionList() {
        Enumeration<HttpSession> elements = sessionList.elements();
        Map<String, String> lists = new HashMap<>();
        while (elements.hasMoreElements()) {
            HttpSession session = elements.nextElement();
            lists.put(session.getId(), String.valueOf(session.getAttribute("userId")));
        }
        return lists;
    }







}
