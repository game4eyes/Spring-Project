


import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";


const NavLink1 = () =>{

    return(
       
              <Layout title ="운행 정보" body ="운행 정보 페이지입니다">
                 <div className = "navLink1">
                <div className ='col1_2' style ={{display:'flex'}}>
                    <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

                    <Sidebars title="운행 정보"/>
                    </div>
                    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
                      운행정보

                    </div>


                </div>
                </div>
          </Layout>
      
        );
}



export default NavLink1;