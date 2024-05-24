import Ad from "../../Ad";
import Article from "../../Article";
import Footer from "../../Footer";
import Header from "../../Header";
import Layout from "../../Layout";
import Sidebars from "../../sidebars/Sidebars";

const NavLink3 = () =>{


    return(
        <Layout title ="기차역정보/노선도페이지" body ="버스운행정보">
        <div className = "navLink2">
    <div className ='col1_2' style ={{display:'flex'}}>
          <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

          
          <Sidebars title="기차역 정보"/>
          </div>
          <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
      기차역정보/노선도페이지 입니다

          </div>


      </div>
      </div>
</Layout>
        );
}







export default NavLink3;