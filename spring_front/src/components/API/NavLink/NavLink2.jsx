import Ad from "../../Ad";
import Article from "../../Article";
import Footer from "../../Footer";
import Header from "../../Header";

const NavLink2 = () =>{


  return(

     <div className = "navLink2">
         <Header/>
         <Article title ="터미널정보" body ="버스운행정보"/>
         터미널정보 (버스)
        <Ad/>
        <Footer/>
    </div>
    ) ;
}

export default NavLink2;