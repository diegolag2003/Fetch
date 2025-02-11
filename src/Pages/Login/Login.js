import {Container, Col, Row} from 'react-bootstrap';
import Logo from '../../Components/Images/Logo.png';
import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import Form from '../../Components/LoginForm';
import './Login.css';

const Login = () => {
    const toast = useRef(null);

  return (
    <Container fluid className="main-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Toast ref={toast}></Toast>
        <Row className="w-100 h-100">
            <Col className="p-5 d-flex align-items-center justify-content-center flex-column" style={{ backgroundColor: '#1e1e2f' }}>
                <img src={Logo} alt="logo" width="500" className='imageLogo'/>
            </Col>
            <Col className="p-5 d-flex align-items-center justify-content-center flex-column" style={{ backgroundColor: '#252836' }}>
                <Form toast={toast}></Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Login