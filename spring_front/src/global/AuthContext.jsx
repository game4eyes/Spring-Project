import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [redirectUrl, setRedirectUrl] = useState('/');              //회원 :버스,기차,항공 페이지 이동에 대한 url
  const [guestRedirectUrl, setGuestRedirectUrl] = useState('/');    //비회원 :버스,기차,항공 페이지 이동에 대한 url
  
//  const global_user_initstate = {                                                    //유저 데이터 (전역 객체 초기값) ===>보류
//   loginId: '',
//   username :'',
//   password : '',
//   passwordCheck : '',
//   birth : '',
//   email :'',
//   phonenum : '',
//   gender : 'male',
//  agreedToTerms :false

// };

//const [global_user, setGlobal_User] = useState(global_user_initstate);               //이름을 global_user에서 userData로 바꿀 예정   ======> 보류

const [loginId, setLoginId] = useState('');

  useEffect(() => {                 //렌더링 시 타이머 시간 초기화 되는 것을 막기위해 시간 저장 변수를 따로 추가함
    if (isLoggedIn) {
      const storedTime = localStorage.getItem('lastActiveTime');
      if (storedTime) {
        setLastActiveTime(parseInt(storedTime, 10));
      } else {
        setLastActiveTime(Date.now());
        localStorage.setItem('lastActiveTime', Date.now().toString());
      }
    } else {
      localStorage.removeItem('lastActiveTime');
      setLastActiveTime(Date.now());
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime, redirectUrl, setRedirectUrl,guestRedirectUrl, setGuestRedirectUrl , loginId, setLoginId }}>
      {children}
    </AuthContext.Provider>
  );
};







// import React, { createContext, useState } from 'react';

// // 초기 상태 설정
// const initialState = {
//   isLoggedIn: false,
//   setIsLoggedIn: () => {}, // 기본값은 빈 함수
// };

// // createContext를 사용하여 컨텍스트 생성
// export const AuthContext = createContext(initialState);

// // Provider 컴포넌트 정의
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
