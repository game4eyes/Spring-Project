import Ad from "../../Ad";
import Article from "../../Article";
import Footer from "../../Footer";
import Header from "../../Header";

const NavLink3 = () =>{


  return(

     <div className = "navLink3">
         <Header/>
         <Article title ="기차역정보/노선도" body ="기차역정보/노선도 페이지입니다"/>
         기차역정보/노선도 (기차)
        <Ad/>
        <Footer/>
    </div>
    ) ;
}

export default NavLink3;