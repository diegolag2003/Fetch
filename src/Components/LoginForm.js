import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/Login/Login.css'; // Import the CSS file for styling

const LoginForm = ({ toast }) => {
    // State variables for storing user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Handle login process
    const handleLogin = () => {
        // Validate input fields
        if (name.trim() === '' || email.trim() === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'All fields are required', life: 5000 });
            return;
        }
    
        // Send login request to the server
        fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Ensures the auth cookie is stored and sent with subsequent requests
            body: JSON.stringify({ name, email }) // Send user credentials
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid name or email');
            }
            return response.json();
        })
        .then(() => {
            navigate('/Browse'); // Redirect to the Browse page on successful login
        })
        .catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 5000 });
        });
    };

    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <Card title={<h2 className='centered-header'>Login</h2>} className="w-full max-w-md login-form">
                <div className="p-fluid">
                    {/* Name input field */}
                    <div className="field">
                        <span className="p-float-label">
                            <InputText 
                                className="mt-3 centered-fields" 
                                id="name" 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <label htmlFor="name">Name</label>
                        </span>
                    </div>
                    
                    {/* Email input field */}
                    <div className="field">
                        <span className="p-float-label">
                            <InputText 
                                className="mt-3 centered-fields" 
                                id="email" 
                                type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>
                </div>
                
                {/* Login button */}
                <Button label="Login" onClick={handleLogin} className="mt-3 centered-fields" />
            </Card>
        </div>
    );
};

export default LoginForm;
