import Ad from "../../Ad";
import Article from "../../Article";
import Footer from "../../Footer";
import Header from "../../Header";

const NavLink1 = () =>{


  return(

     <div className = "navLink1">
         <Header/>
         <Article title ="운행정보" body ="운행정보"/>
         운행정보
        <Ad/>
        <Footer/>
    </div>
    ) ;
}

export default NavLink1;