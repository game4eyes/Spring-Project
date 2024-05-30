
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";

const NavLink4 = () =>{

return(
  <Layout title ="안내/공항 서비스" body ="공항 정보">
  <div className = "navLink4">
<div className ='col1_2' style ={{display:'flex'}}>
    <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

    
    <Sidebars title="안내/공항 서비스"/>
    </div>
    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
공항 안내 정보

    </div>


</div>
</div>
</Layout>
    );
}

export default NavLink4;

