import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import '../../styles/Header.css';

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];

const Header = () => {

  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('.sticky_header');
      } else {
        headerRef.current.classList.remove('.sticky_header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener('scroll', stickyHeaderFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {
                  nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={navClass => navClass.isActive ? 'active_link' : ''}>
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                <button className='btn btn-warning border-0 rounded-2'>
                  <Link to={'/login'} className='text-decoration-none text-white'>Login</Link>
                </button>

                <button className='btn btn-primary border-0 rounded-2'>
                  <Link to={'/register'} className='text-decoration-none text-white'>Register</Link>
                </button>
              </div>
            </div>

            <span className="mobile_menu">
              <i className="ri-menu-line"></i>
            </span>

          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;