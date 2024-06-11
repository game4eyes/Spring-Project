
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";
import Gimhae from '@components/img/navlink/gimhae.png'; // 경로 수정
import Gimhae2 from '@components/img/navlink/gimhae2.png'; // 경로 수정
const NavLink4 = () =>{

return(
  <Layout title ="안내/공항 서비스" body ="공항 정보">
  <div className = "navLink4">
<div className ='col1_2' style ={{display:'flex'}}>
    <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

    
    <Sidebars title="운행 정보"/>
    </div>
    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
    <img src={Gimhae} alt="Railway Line" style={{ marginLeft:'80px', maxWidth: '100%', maxHeight: '100%', cursor: 'pointer',marginBottom:'50px' }}/>
    <img src={Gimhae2} alt="Railway Line" style={{ marginLeft:'80px', maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' , marginBottom:'50px' }}/>

    </div>


</div>
</div>
</Layout>
    );
}

export default NavLink4;

