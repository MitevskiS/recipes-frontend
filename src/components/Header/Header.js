import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {ReactComponent as HeaderLogo} from '../../assets/icons/logo_color.svg';
import "./Header.css";

let activeStyle = {
  color: "orange",
};

const menuItems = [
  { navigateTo: '/breakfast', name: 'Breakfast' },
  { navigateTo: '/brunch', name: 'Brunch' },
  { navigateTo: '/lunch', name: 'Lunch' },
  { navigateTo: '/dinner', name: 'Dinner' },
]

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');

  const handleLogout = async() => {
    await localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className='header-container'>
      <Link to='/'>
        <HeaderLogo style={{ marginRight: '10px' }} />
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.navigateTo}
              className="header-link"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              {item.name}
            </NavLink>
          )
        })}
      </div>
      {!isLoggedIn && 
        (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
            <Link to="/login" className='header-button header-button-login'>LOG IN</Link>
            <p style={{ margin: "0 10px", color: 'orange', fontFamily: 'fantasy' }}>or</p>
            <Link to="/create-account" className='header-button header-button-create-account'>CREATE ACCOUNT</Link>
          </div>
        )
      }
      {isLoggedIn && 
        (
          <div>
            <NavLink
              to="/my-recipes"
              className="header-link-user"
              style={{ color: '#96BB36' }}
              
            >
              My recipes
            </NavLink>
            <NavLink
              to="/my-profile"
              className="header-link-user"
              style={{ color: 'orange' }}
              
            >
              My profile
            </NavLink>
            <NavLink
              className="header-link-user"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </div>
        )
      }
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
        <Link to="/login" className='header-button header-button-login'>LOG IN</Link>
        <p style={{ margin: "0 10px", color: 'orange', fontFamily: 'fantasy' }}>or</p>
        <Link to="/create-account" className='header-button header-button-create-account'>CREATE ACCOUNT</Link>
      </div> */}
    </div>
  );
}

export default Header;
