import React, { useState } from 'react';
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";
import RailwayLine from '@components/img/RailwayLine/RailwayLine.png'; // 경로 수정
import Modal from '@components/img/RailwayLine/Modal'; // 경로 수정 

const NavLink3 = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Layout title="기차역정보/노선도" body="KTX 경부선 노선도">
             <div className = "navLink3">
                <div className ='col1_2' style ={{display:'flex'}}>
                <div className ='col1' style={{float:'left',width:'30%',height:'100%'}}>

                    <Sidebars title="운행 정보"/>
                    </div>
                    <div className='col2' style={{float:'right',width:'100%',height:'100%'}}>
                    <img src={RailwayLine} alt="Railway Line" style={{ marginLeft:'80px', maxWidth: '100%', maxHeight: '70%', cursor: 'pointer' }} />

                    </div>


                </div>
                </div>

        </Layout>
    );
}

export default NavLink3;

