import Ad from "../../Ad";
import Article from "../../Article";
import Footer from "../../Footer";
import Header from "../../Header";

const NavLink4 = () =>{

return(
    <div className = "navLink4">
          <Header/>
          <Article title ="안내 서비스(공항)" body ="안내 서비스(공항) 페이지입니다"/>
        안내 서비스(공항)
        <Ad/>
        <Footer/>
    </div>
    );
}

export default NavLink4;