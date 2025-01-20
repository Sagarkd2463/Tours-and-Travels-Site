import React, { useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../router/Routers';
import { AuthContext } from '../../context/AuthContext';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';

const Layout = () => {
  const { user, logout: logoutAuthContext } = useContext(AuthContext);
  const { Fuser, logout: logoutFirebase } = useContext(AuthFirebaseContext);

  // Determine the active user
  const activeUser = user || Fuser;

  const handleLogout = () => {
    if (user) logoutAuthContext(); // Logout from local context
    if (Fuser) logoutFirebase(); // Logout from Firebase context
  };

  return (
    <>
      <Header activeUser={activeUser} onLogout={handleLogout} />
      <Routers activeUser={activeUser} />
      <Footer />
    </>
  );
};

export default Layout;