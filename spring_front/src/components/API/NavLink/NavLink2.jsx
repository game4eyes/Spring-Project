
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";

const NavLink2 = () =>{

    return(
      
              <Layout title ="터미널정보" body ="버스운행정보">
                  <div className = "navLink2">
              <div className ='col1_2' style ={{display:'flex'}}>
                    <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

                    
                    <Sidebars title="터미널 정보"/>
                    </div>
                    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
                터미널정보

                    </div>


                </div>
                </div>
          </Layout>
    
        );


}




export default NavLink2;