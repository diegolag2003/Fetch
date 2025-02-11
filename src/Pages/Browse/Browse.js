import {Container, Col, Row} from 'react-bootstrap';
import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import BrowseDogs from '../../Components/BrowseDogs';
import './Browse.css';

const Browse = () => {
    const toast = useRef(null);

    return (
        <Container fluid className="main-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Toast ref={toast}></Toast>
            <Row className="w-100 h-100"  style={{ backgroundColor: '#252836' }}>
                <Col className="p-5 d-flex align-items-center justify-content-center flex-column" style={{ backgroundColor: '#252836' }}>
                    <BrowseDogs></BrowseDogs>
                </Col>
            </Row>
        </Container>
    )
}

export default Browse