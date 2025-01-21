import React, { useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../router/Routers';
import { AuthContext } from '../../context/AuthContext';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';

const Layout = () => {
  const { user, emailLogout } = useContext(AuthContext);
  const { Fuser, firebaseLogout } = useContext(AuthFirebaseContext);

  // Determine the active user
  const activeUser = user || Fuser;

  const handleLogout = () => {
    try {
      if (user) emailLogout();
      if (Fuser) firebaseLogout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
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