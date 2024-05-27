import React, { useState } from 'react';
import Layout from "../../Layout";
import Sidebars from "@components/Sidebars";
import RailwayLine from '../../img/RailwayLine/RailwayLine.jpg'; // 경로 수정
import Modal from '../../img/RailwayLine/Modal'; // 경로 수정 

const NavLink3 = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Layout title="기차역정보/노선도페이지" body="철도노선도">
            <div className="navLink3" style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
                <div className="col1" style={{ width: '20%', padding: '20px', overflowY: 'auto' }}>
                    <Sidebars title="기차역 정보" />
                </div>
                <div className="col2" style={{ width: '80%', padding: '20px', textAlign: 'center', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <img src={RailwayLine} alt="Railway Line" style={{ maxWidth: '80%', maxHeight: '80%', cursor: 'pointer' }} onClick={handleImageClick} />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <img src={RailwayLine} alt="Railway Line" style={{ width: '100%', height: 'auto' }} />
            </Modal>
        </Layout>
    );
}

export default NavLink3;