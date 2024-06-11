import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeBlackIcon } from '@/icon/home_black.svg';

function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname; // 현재 경로

  // 경로에 따라서 보여줄 데이터 설정
  let dataText = '';
  let path1Text = '';

  switch (pathname) {
    case '/':
      // dataText = 'Data';
      // path1Text = 'path1';
      break;
    // 다른 경로에 대한 설정 추가
    case '/ticketbook/bus':
      dataText = '예매';
      path1Text = '버스';
      break;

      case '/ticketbook/train':
        dataText = '예매';
        path1Text = '기차';
        break;

        case '/ticketbook/plane':
          dataText = '예매';
          path1Text = '공항';
          break;

          case '/nav/navlink1':
            dataText = '버스 터미널 정보';
            path1Text = '서울고속버스터미널';
            break;

          case '/nav/navlink2':
            dataText = '버스 터미널 정보';
            path1Text = '센트럴시티터미널';
            break;

            case '/nav/navlink3':
              dataText = '기차역정보 노선도';
              path1Text = 'KTX 경부선 노선도';
              break;

              case '/nav/navlink4':
                dataText = '안내공항서비스';
                path1Text = '김해국제공항';
                break;
    

            case '/api/user/mypage':
              dataText = '사용자';
              path1Text = '마이페이지';
              break;

              case '/footer/TravelTermsandConditions':
                dataText = '국내여행 이용약관';
                path1Text = '';
                break;

                case '/footer/TermsofUse':
                  dataText = '이용약관';
                  path1Text = '';
                  break;
              
    default:
      break;
  }

  return (
    <div className="b-example-divider">
      <div className="container my-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <nav aria-label="breadcrumb" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', textAlign: 'left', width: '100%', marginTop: '-70px', marginLeft: '-60px' }}>
          <ol className="breadcrumb breadcrumb-chevron p-3 rounded-3">
            <li className="breadcrumb-item">
              <Link to ={"/"} className="link-body-emphasis">
                <HomeBlackIcon className="bi" width="16" height="16"/>
                <span className="visually-hidden" style={{marginTop:'15px'}} >Home</span>
              </Link>
            </li>

            <li className="breadcrumb-item">
              <a className="link-body-emphasis text-decoration-none" style={{marginTop:'15px',marginRight:'5px'}} href="#" >{dataText}</a>
            </li>
           
            <li className="breadcrumb-item" style={{marginLeft:'-10px'}}>

              {path1Text === '버스' &&
              <Link to = {'/ticketbook/bus'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
               {path1Text === '기차' &&
              <Link to = {'/ticketbook/train'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
               {path1Text === '공항' &&
              <Link to = {'/ticketbook/plane'} className="link-body-emphasis fw-semibold text-decoration-none" >{path1Text}</Link>
              }
                {path1Text === '서울고속버스터미널' &&
              <Link to = {'/nav/navlink1'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
                {path1Text === '센트럴시티터미널' &&
              <Link to = {'/nav/navlink2'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
                {path1Text === 'KTX 경부선 노선도' &&
              <Link to = {'/nav/navlink3'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
                {path1Text === '김해국제공항' &&
              <Link to = {'/nav/navlink4'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }

                {path1Text === '마이페이지' &&
              <Link to = {'/api/user/mypage'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }

            </li>
           
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
