package com.travel.booking.domain.user.resolver;

import com.travel.booking.domain.user.annotation.Login;
import com.travel.booking.domain.user.dto.SessionUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

    /**
     * 컨트롤러 메서드의 특정 파라미터를 지원하는지 판단
     * 여기서는 파라미터에 @Login 어노테이션이 붙어 있고, 파라미터 클래스 타입이 SessionUser.class인 경우 true를 반환한다.
     */
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginUserAnnotation = parameter.getParameterAnnotation(Login.class) != null;
        boolean isUserClass = SessionUser.class.equals(parameter.getParameterType());
        return isLoginUserAnnotation && isUserClass;
    }

    /**
     * 파라미터에 전달할 객체를 생성한다.
     * 여기선 세션에서 객체를 가져온다.
     */
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        // 이미 세션이 있다면 그 세션을 돌려주고, 세션이 없으면 null을 돌려준다.
        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }
        return session.getAttribute("user");
    }

}
