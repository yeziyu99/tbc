import React,{ useEffect } from 'react';
import Header from './header';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useHistory, useLocation, useRouteMatch, useParams, } from 'react-router-dom'
// import './style/login.scss';
function Layout(props) {
  // let history=useRouteMatch()
  useEffect(() => {
  }, [])
  const jump=()=>{
    // history.push('/')
  }
  return (
    <div className="layout">
      {/* <div>layout</div>
      <Router></Router> */}
      <Header></Header>
      {/* <Router></Router> */}
    </div>
  );
}

export default Layout;