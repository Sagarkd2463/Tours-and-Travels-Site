import React, { useContext, useEffect, useRef } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import '../../styles/Header.css';
import { AuthContext } from '../../context/AuthContext';

const nav_links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
];

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleScroll = () => {
    if (headerRef.current) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? 'active_link' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}

                {/* My Bookings (Visible for Logged-In Users Only) */}
                {user && (
                  <li className="nav_item">
                    <NavLink
                      to="/bookings"
                      className={(navClass) => (navClass.isActive ? 'active_link' : '')}
                    >
                      My Bookings
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">
                      {truncateText(user.username || user.email, 18)}
                    </h5>
                    <Button className="btn btn-danger text-white" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn btn-warning border-0 rounded-2">
                      <Link to={'/login'} className="text-decoration-none text-white">
                        Login
                      </Link>
                    </Button>

                    <Button className="btn btn-primary border-0 rounded-2">
                      <Link to={'/register'} className="text-decoration-none text-white">
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile_menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;