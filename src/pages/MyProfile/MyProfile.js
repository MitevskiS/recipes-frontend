import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./MyProfile.css";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const getCurrentDateInput = (date) => {
    if (!!date) {
      const dateObj = new Date(date);
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      const year = dateObj.getFullYear();
  
      const shortDate = `${year}-${month}-${day}`;
    
      return shortDate;
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/account/${user.id}`, {
      headers: {
        'x-access-token': `${user.id}`,
      }}).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setBirthday(response.data.birthday);
        setImage(response.data.image);
    });
  }, [user.id]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('password', password);
    formData.append('repeatPassword', repeatPassword);
    formData.append('image', image);
    if (file) {
      formData.append('image', file);
    }
    axios.put(`http://localhost:5000/api/create-account/${user.id}`, formData, {
      headers: {
        'x-access-token': `${user?.token}`,
      }}).then((response) => {
      navigate('/my-recipes');
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
        <p style={{ color: '#96BB36', fontSize: '27px', fontFamily: 'cursive', width: '260px' }}>My Profile</p>
        <div style={{
          width: '100%',
          border: '1px solid #EFEEEA',
          marginLeft: '10px',
        }} />
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <div style={{ width: '12%', display: 'flex', flexDirection: 'column' }}>
          <img style={{ borderRadius: '50%', height: '114px', marginLeft: '10px' }} src={image} alt="" />
          <div style={{ width: '130px' }}>
            <input type="file" id="uploadImage" accept="image/png, image/jpeg" style={{ visibility: 'hidden' }} onChange={handleFileChange} />
            <label for="uploadImage" className='account-button account-change-avatar-button'>Change Avatar</label>
          </div>
        </div>
        <div style={{ width: '70%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="firstName" style={{ color: 'orange', fontFamily: 'cursive' }}>First Name</label>
            <input type="text" id="firstName" name="firstName" autoComplete="off" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="lastName" style={{ color: 'orange', fontFamily: 'cursive' }}>Last Name</label>
            <input type="text" id="lastName" name="lastName" autoComplete="off" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="email" style={{ color: 'orange', fontFamily: 'cursive' }}>Email</label>
            <input type="text" id="email" name="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="birthday" style={{ color: 'orange', fontFamily: 'cursive' }}>Birthday</label>
            <input type="date" id="birthday" name="birthday" autoComplete="off" value={getCurrentDateInput(birthday)} onChange={(e) => setBirthday(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="password" style={{ color: 'orange', fontFamily: 'cursive' }}>Password</label>
            <input type="password" id="password" name="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
            <label htmlFor="repeatPassword" style={{ color: 'orange', fontFamily: 'cursive' }}>Repeat Password</label>
            <input type="password" id="repeatPassword" name="repeatPassword" autoComplete="off" onChange={(e) => setRepeatPassword(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
          <button className={`account-button save-account-button${isSaveButtonDisabled ? ' save-account-button-disabled' : ''}`} onClick={handleSave} disabled={isSaveButtonDisabled}>Save</button>
        </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
