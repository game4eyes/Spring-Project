import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);  // 사용자 정보 상태 추가
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState('/');
  const [guestRedirectUrl, setGuestRedirectUrl] = useState('/');
  const [loginId, setLoginId] = useState('');
  const [userEmail, setUserEmail] = useState(''); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      user, 
      setUser,
      lastActiveTime, 
      setLastActiveTime, 
      redirectUrl, 
      setRedirectUrl,
      guestRedirectUrl, 
      setGuestRedirectUrl,
      loginId, 
      setLoginId,
      login,
      logout,
      userEmail, setUserEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
