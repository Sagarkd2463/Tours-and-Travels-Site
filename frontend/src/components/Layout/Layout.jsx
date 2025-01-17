import React, { useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../router/Routers';
import FirebaseHeader from '../Header/FirebaseHeader';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';

const Layout = () => {

  const { user } = useContext(AuthFirebaseContext);

  return (
    <>
      {user ? <FirebaseHeader /> : <Header />}
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;