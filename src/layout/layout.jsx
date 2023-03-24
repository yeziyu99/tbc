import React,{ useEffect } from 'react';
import Header from './header';
// import './style/login.scss';
import Router from '../router/index'
function Layout() {
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="layout">
      <Header></Header>
      {/* <Router></Router> */}
    </div>
  );
}

export default Layout;