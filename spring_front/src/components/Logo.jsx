import { Link } from "react-router-dom";
import LogoImage from '@components/img/logo/logo3.png';


function Logo(){           // 로고
    return(
    <div className="logo"> 
     <Link to={'/'}><img src={LogoImage} alt="Logo" style={{marginLeft:'-25px',marginTop:'-5px'}} width='50px' height='50px' />  </Link>
    </div> 
  ) ;
  }

  export default Logo;