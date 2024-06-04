


import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";
import SeoulGosok from '@components/img/navlink/seoulgosokterminal.png'; // 경로 수정

const NavLink1 = () =>{

    return(
       
              <Layout title ="버스 터미널 정보" body ="운행 정보 페이지입니다">
                 <div className = "navLink1">
                <div className ='col1_2' style ={{display:'flex'}}>
                <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

                    <Sidebars title="운행 정보"/>
                    </div>
                    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
                    <img src={SeoulGosok} alt="Railway Line" style={{ marginLeft:'80px', maxWidth: '100%', maxHeight: '100%', cursor: 'pointer', marginBottom:'100px' }} />

                    </div>


                </div>
                </div>
          </Layout>
      
        );
}



export default NavLink1;