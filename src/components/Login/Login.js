import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const form = {
      email, password
    };
    axios.post('http://localhost:5000/api/login', form)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response?.data));
      navigate('/');
    }).catch((error) => {
      alert(error.response.data.result);
    });
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ color: '#96BB36', fontSize: '27px', fontFamily: 'cursive', width: '100px' }}>Log In</p>
        <div style={{
          width: '100%',
          border: '1px solid #EFEEEA',
          marginLeft: '10px',
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
        <div style={{ width: '50%' }}>
          <div style={{ color: '#626262', fontSize: '30px', fontFamily: 'cursive', marginBottom: '10px' }}><span style={{ color: 'orange' }}>Welcome to</span> Baby's</div>
          <div style={{ color: 'grey', fontFamily: 'sans-serif', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
        <div style={{ width: '50%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="email" style={{ color: 'orange', fontFamily: 'cursive' }}>Email</label>
            <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="password" style={{ color: 'orange', fontFamily: 'cursive' }}>Password</label>
            <input type="password" id="password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <button className='login-button' onClick={handleLogin}>LOG IN</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
