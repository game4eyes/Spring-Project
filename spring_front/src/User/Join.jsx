import React, { useState, useRef } from 'react';
import { userJoin } from '../api/todoApi';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '@/css/form/joinform.css'
import Logo_black from '@/components/Logo_black';
const Join = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const userData = {
        email,
        username,
        password,
        passwordCheck
      };

      console.log(userData);
      await userJoin(userData); // 서버로 요청 보내기
      alert('회원가입이 완료되었습니다.');
      // navigate('/api/user/login'); // 리디렉션
      navigate('/');
    } catch (error) {
      let errorMessage = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `오류 코드: ${error.response.status}`;
      }
      alert(errorMessage);
      console.error(errorMessage); // 오류 로그
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert(validationError.message);
      validationError.ref.current.focus();
      return;
    }
    if (!agreedToTerms) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    handleJoin(); // 가입 처리 로직
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!email.trim()) {
      return { message: '이메일을 입력하세요.', ref: emailRef };
    } else if (!emailPattern.test(email.trim())) {
      return { message: '유효한 이메일 주소를 입력하세요.', ref: emailRef };
    }

    if (!username.trim()) {
      return { message: '닉네임을 입력하세요.', ref: usernameRef };
    }

    // if (!password) {
    //   return { message: '비밀번호를 입력하세요.', ref: passwordRef };
    // } else if (!passwordPattern.test(password)) {
    //   return { message: '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.', ref: passwordRef };
    // }

    if (password !== passwordCheck) {
      return { message: '비밀번호가 일치하지 않습니다.', ref: passwordCheckRef };
    }

    return null; // 모든 유효성 검사를 통과한 경우
  };


  // const checkemail = () {



  // }



  const privacyPolicy = `
  [개인정보 수집 및 이용 동의서]
  - 수집하는 개인정보 항목: 아이디, 비밀번호, 이름, 이메일, 전화번호 등
  - 개인정보 수집 목적: 회원가입 및 관리, 서비스 이용 통계 및 분석 등
  - 보유 및 이용 기간: 회원 탈퇴 시까지
  
  자세한 내용은 아래 개인정보 수집 및 이용 동의서를 참고해주세요.
  
  
  1. 수집하는 개인정보
  이용자는 서비스를 이용하기 위해 회원가입을 할 경우, TRABLE은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
  
  회원가입 시점에 TRABLE이 이용자로부터 수집하는 개인정보는 아래와 같습니다.
  - 회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호를, 선택항목으로 이메일주소를 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입 확인정보(DI), 내외국인 정보를 함께 수집합니다. 만14세 미만 아동의 경우, 법정대리인 정보(법정대리인의 이름, 중복가입확인정보(DI), 휴대전화번호)를 추가로 수집합니다.
  - 비밀번호 없이 회원 가입 시에는 필수항목으로 아이디, 이름, 생년월일, 휴대전화번호를, 선택항목으로 비밀번호를 수집합니다.
  - 단체 회원가입 시 필수 항목으로 단체아이디, 비밀번호, 단체이름, 이메일주소, 휴대전화번호를, 선택항목으로 단체 대표자명을 수집합니다.
  서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
  - 회원정보 또는 개별 서비스에서 프로필 정보(별명, 프로필 사진)를 설정할 수 있습니다. 회원정보에 별명을 입력하지 않은 경우에는 마스킹 처리된 아이디가 별명으로 자동 입력됩니다.
  - TRABLE 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
  
  
  
  서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다. 또한 이미지 및 음성을 이용한 검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다.
  구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를 저장(수집)하거나, 2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못 하도록 안전하게 변환하여 수집합니다.
  서비스 이용 과정에서 위치정보가 수집될 수 있으며,
  TRABLE이 제공하는 위치기반 서비스에 대해서는 'TRABLE 위치기반서비스 이용약관'에서 자세하게 규정하고 있습니다.
  이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라 개인정보에 해당할 수 있고, 개인정보에 해당하지 않을 수도 있습니다.
  생성정보 수집에 대한 추가 설명
  - IP(Internet Protocol) 주소란?
  IP 주소는 인터넷 망 사업자가 인터넷에 접속하는 이용자의 PC 등 기기에 부여하는 온라인 주소정보 입니다. IP 주소가 개인정보에 해당하는지 여부에 대해서는 각국마다 매우 다양한 견해가 있습니다.
  - 서비스 이용기록이란?
  TRABLE 접속 일시, 이용한 서비스 목록 및 서비스 이용 과정에서 발생하는 정상 또는 비정상 로그 일체,메일 수발신 과정에서 기록되는 이메일주소, 친구 초대하기 또는 선물하기 등에서 입력하는 휴대전화번호, 스마트스토어 판매자와 구매자간 상담내역 등을 의미합니다.
  - 기기정보란?
  본 개인정보처리방침에 기재된 기기정보는 생산 및 판매 과정에서 기기에 부여된 정보뿐 아니라, 기기의 구동을 위해 사용되는 S/W를 통해 확인 가능한 정보를 모두 일컫습니다. OS(Windows, MAC OS 등) 설치 과정에서 이용자가 PC에 부여하는 컴퓨터의 이름, PC에 장착된 주변기기의 일련번호, 스마트폰의 통신에 필요한 고유한 식별값(IMEI, IMSI), AAID 혹은 IDFA, 설정언어 및 설정 표준시, USIM의 통신사 코드 등을 의미합니다. 단, TT는 IMEI와 같은 기기의 고유한 식별값을 수집할 필요가 있는 경우, 이를 수집하기 전에 TT도 원래의 값을 알아볼 수 없는 방식으로 암호화 하여 식별성(Identifiability)을 제거한 후에 수집합니다.
  - 쿠키(cookie)란?
  쿠키는 이용자가 웹사이트를 접속할 때에 해당 웹사이트에서 이용자의 웹브라우저를 통해 이용자의 PC에 저장하는 매우 작은 크기의 텍스트 파일입니다. 이후 이용자가 다시 웹사이트를 방문할 경우 웹사이트 서버는 이용자 PC에 저장된 쿠키의 내용을 읽어 이용자가 설정한 서비스 이용 환경을 유지하여 편리한 인터넷 서비스 이용을 가능케 합니다. 또한 방문한 서비스 정보, 서비스 접속 시간 및 빈도, 서비스 이용 과정에서 생성된 또는 제공(입력)한 정보 등을 분석하여 이용자의 취향과 관심에 특화된 서비스(광고 포함)를 제공할 수 있습니다. 이용자는 쿠키에 대한 선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 네이버 일부 서비스의 이용에 불편이 있을 수 있습니다.
  쿠키에 관한 자세한 내용(TRABLE 프라이버시 센터) 알아보기
  
  
  2. 수집한 개인정보의 이용
  TRABLE 서비스의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.
  
  - 회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및 법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
  - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
  - 법령 및 TRABLE 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
  - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.
  - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
  - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.
  - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
  
  
  3. 개인정보의 보관기간
  회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
  단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
  이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.
  - 부정 가입 및 이용 방지
  부정 이용자의 가입인증 휴대전화번호 또는 DI (만 14세 미만의 경우 법정대리인DI) : 탈퇴일로부터 6개월 보관
  탈퇴한 이용자의 휴대전화번호(휴대전화 인증 시), DI(아이핀 인증 시): 탈퇴일로부터 6개월 보관(복호화가 불가능한 일방향 암호화(해시)하여 보관)
  - TRABLE 서비스 제공을 위한 본인 확인
  통신사 정보 : 수집 시점으로부터 1년 보관
  전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및 전자거래 기본법, 통신비밀보호법 등 법령에서 일정기간 정보의 보관을 규정하는 경우는 아래와 같습니다. TT는 이 기간 동안 법령의 규정에 따라 개인정보를 보관하며, 본 정보를 다른 목적으로는 절대 이용하지 않습니다.
  - 전자상거래 등에서 소비자 보호에 관한 법률
  계약 또는 청약철회 등에 관한 기록: 5년 보관
  대금결제 및 재화 등의 공급에 관한 기록: 5년 보관
  소비자의 불만 또는 분쟁처리에 관한 기록: 3년 보관
  - 전자문서 및 전자거래 기본법
  공인전자주소를 통한 전자문서 유통에 관한 기록 : 10년 보관
  - 통신비밀보호법
  로그인 기록: 3개월
  
  
  4. 개인정보 수집 및 이용 동의를 거부할 권리
  이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
  `;

  return (
    // <Layout title="회원가입" body="회원가입 창">
    <div className="join-page" style={{ textAlign: 'center',marginTop:'40px' }}>
    <div className="Join-container"  style={{  width:'30%',textAlign: 'center' }}>


    <h2 style={{ marginBottom:'30px'}}>  <Logo_black/></h2><br></br>
        {/* <h2 style={{ textAlign: 'center', marginBottom:'30px', marginTop:'-80px' }}>회원가입</h2> */}
        <br></br>
        <form onSubmit={handleSubmit} style={{marginTop:'-80px',width:'100%', textAlign:'left'}}>
          <div className="form-group">
            <label htmlFor="email" style={{display:'flex'}}>이메일 <h3 style={{marginLeft:'20px',marginTop:'7px',color:'red',fontSize:'10px'}}>실제 사용하는 이메일이 아닐 시에는, 결제가 안될 수 있습니다</h3></label>
            {/* <button type="button" onclick={checkEmail}>이메일 확인</button> */}
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">닉네임</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              type="password"
              id="passwordCheck"
              ref={passwordCheckRef}
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              id="privacyPolicy"
              rows="5"
              readOnly
              value={privacyPolicy}
              style={{ width: '100%', resize: 'none', overflowY: 'scroll', marginBottom: '10px' }}
            />
             <div className="checkbox" style={{display:'flex'}}>
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms">개인정보 수집 및 이용에 동의합니다</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="가입" />
          </div>
          
        </form>
    
      </div>
    </div>
 
 //</Layout> 
  );
};

export default Join;
