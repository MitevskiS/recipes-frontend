import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CreateAccount.css";

function CreateAccount() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleCreate = () => {
    const form = {
      firstName, lastName, email, birthday, password, repeatPassword
    };
    axios.post('http://localhost:5000/api/create-account', form).then((response) => {
      navigate('/login');
    });
  }

  const isSaveButtonDisabled = useMemo(() => {
    return !firstName || !lastName || !email || !birthday || !password || !repeatPassword;
  }, [firstName, lastName, email, birthday, password, repeatPassword]);

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ color: '#96BB36', fontSize: '27px', fontFamily: 'cursive', width: '260px' }}>Create Account</p>
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
        <div style={{ width: '33%' }}>
          <div style={{ color: '#626262', fontSize: '30px', fontFamily: 'cursive', marginBottom: '10px' }}><div style={{ color: 'orange' }}>Create your</div> account</div>
          <div style={{ color: 'grey', fontFamily: 'sans-serif', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
        <div style={{ width: '66%' }}>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="firstName" style={{ color: 'orange', fontFamily: 'cursive' }}>First Name</label>
              <input type="text" id="firstName" name="firstName" autoComplete="off" onChange={(e) => setFirstName(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="lastName" style={{ color: 'orange', fontFamily: 'cursive' }}>Last Name</label>
              <input type="text" id="lastName" name="lastName" autoComplete="off" onChange={(e) => setLastName(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="email" style={{ color: 'orange', fontFamily: 'cursive' }}>Email</label>
              <input type="text" id="email" name="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="birthday" style={{ color: 'orange', fontFamily: 'cursive' }}>Birthday</label>
              <input type="date" id="birthday" name="birthday" autoComplete="off" onChange={(e) => setBirthday(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="password" style={{ color: 'orange', fontFamily: 'cursive' }}>Password</label>
              <input type="password" id="password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="repeatPassword" style={{ color: 'orange', fontFamily: 'cursive' }}>Repeat Password</label>
              <input type="password" id="repeatPassword" name="repeatPassword" autoComplete="off" onChange={(e) => setRepeatPassword(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '50px' }}>
            <button className={`create-account-button${isSaveButtonDisabled ? ' create-account-button-disabled' : ''}`} onClick={handleCreate} disabled={isSaveButtonDisabled}>CREATE ACCOUNT</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
