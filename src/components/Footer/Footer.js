import React from "react";
import { Link, NavLink } from 'react-router-dom';
import {ReactComponent as FooterLogo} from '../../assets/icons/logo_white.svg';
import './Footer.css';

let activeStyle = {
    color: "orange",
  };
  
  const menuItems = [
    { navigateTo: '/breakfast', name: 'Breakfast' },
    { navigateTo: '/brunch', name: 'Brunch' },
    { navigateTo: '/lunch', name: 'Lunch' },
    { navigateTo: '/dinner', name: 'Dinner' },
  ]
  
  function Footer() {
    return (
      <div className='footer-container'>
        <Link to='/'>
          <FooterLogo style={{ marginRight: '10px', width: '80px' }} />
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {menuItems.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.navigateTo}
                className="footer-link"
                style={({ isActive }) => isActive ? activeStyle : undefined}
              >
                {item.name}
              </NavLink>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
            <p className="footer-copyright">Baby's Food Place <br /> copyright 2021</p>
        </div>
      </div>
    );
  }
  
  export default Footer;