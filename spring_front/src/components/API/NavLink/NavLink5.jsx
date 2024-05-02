import Ad from "../../Ad";
import Article from "../../Article";
import Charge from "@components/Charge";
import Footer from "../../Footer";
import Header from "../../Header";

const NavLink5 = () =>{

    return(
    <div className = "navLink5">
           <Header/>
           <Article title ="수수료 정보" body ="수수료 정보 페이지입니다"/>
            <Charge />
        <Ad/>
        <Footer/>
    </div>
    );
}

export default NavLink5;