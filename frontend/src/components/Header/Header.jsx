import React, { useRef, useEffect, useContext } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logout as firebaseLogout } from '../../redux/firebaseAuthSlice';
import logo from '../../assets/images/logo.png';
import '../../styles/Header.css';
import { AuthContext } from '../../context/AuthContext';

const nav_links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/bookings', display: 'My Bookings' },
];

const truncateText = (text, maxLength) =>
  text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user: contextUser, logout: contextLogout } = useContext(AuthContext);
  const { user: firebaseUser } = useSelector((state) => state.Fuser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (firebaseUser) {
      dispatch(firebaseLogout());
      toast.success('Logged out successfully...');
      navigate('/');
    } else if (contextUser) {
      contextLogout();
      toast.success('Logged out successfully...');
      navigate('/');
    }
  };

  const currentUser = firebaseUser || contextUser;

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add('sticky_header');
        } else {
          headerRef.current.classList.remove('sticky_header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
                    {(item.path !== '/bookings' || currentUser) && (
                      <NavLink
                        to={item.path}
                        className={(navClass) => (navClass.isActive ? 'active_link' : '')}
                      >
                        {item.display}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {currentUser ? (
                  <>
                    <h5 className="mb-0">
                      {truncateText(
                        currentUser.displayName || currentUser.username || currentUser.email,
                        18
                      )}
                    </h5>
                    <Button className="btn btn-danger text-white" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn btn-warning border-0 rounded-2">
                      <Link to="/login" className="text-decoration-none text-white">
                        Login
                      </Link>
                    </Button>
                    <Button className="btn btn-primary border-0 rounded-2">
                      <Link to="/register" className="text-decoration-none text-white">
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