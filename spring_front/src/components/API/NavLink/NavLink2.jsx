
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";
import Centralcity from '@components/img/navlink/centralcity.png'; // 경로 수정
const NavLink2 = () =>{

    return(
      
              <Layout title ="버스 터미널 정보" body ="버스운행정보">
                  <div className = "navLink2">
              <div className ='col1_2' style ={{display:'flex'}}>
                    <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

                    
                    <Sidebars title="운행 정보"/>
                    </div>
                    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
                    <img src={Centralcity} alt="Railway Line" style={{ marginLeft:'80px', maxWidth: '100%', maxHeight: '70%', cursor: 'pointer',marginBottom:'100px' }} />

                    </div>


                </div>
                </div>
          </Layout>
    
        );


}




export default NavLink2;