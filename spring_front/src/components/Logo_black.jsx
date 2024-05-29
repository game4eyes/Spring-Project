import { Link } from "react-router-dom";
import LogoImage from '@components/img/logo/logo_black.png';


function Logo(){           // 로고
    return(
    <div className="logo"> 
     <Link to={'/'}><img src={LogoImage} alt="Logo" style={{marginLeft:'0px',marginTop:'5px',}} width='200px' height='160px' />  </Link>
    </div> 
  ) ;
  }

  export default Logo;