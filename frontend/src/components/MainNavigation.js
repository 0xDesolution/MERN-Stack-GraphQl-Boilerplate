import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { Nav } from 'react-bootstrap';
import './MainNavigation.css';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {(context) => {
      return(
        <div className="main-navigation">

       <NavLink to="/auth"  className="main-navigation__logo">
       <img src="https://res.cloudinary.com/mhmd/image/upload/v1557368579/logo_iqjuay.png" width="45" alt="Rhine"/>
       </NavLink>
        
      <Nav className="main-navigation__items">
      <ul>
        
          {!context.token && (
          <li>
            
          <NavLink to="/auth">Authenticate</NavLink>
          </li>)}
        
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
       {context.token &&  (
         <React.Fragment>
           <li>
          <NavLink to="/bookings">Bookings</NavLink>
          </li> 
            <li>
          <button onClick={context.logout}>Logout</button>
            </li>

        </React.Fragment>
      )}

        
      </ul>
    </Nav>
  </div>

      )
    }}
  
  </AuthContext.Consumer>
);

export default mainNavigation;