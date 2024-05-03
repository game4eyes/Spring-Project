import { Link } from "react-router-dom";

function Logo(){           // 로고
    return(
    <div className="logo"> 
     <h1><Link to={'/'}> KIC 관광공사 (홈) </Link></h1> 
    </div> 
  ) ;
  }

  export default Logo;