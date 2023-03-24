// import logo from './logo.svg';
import Layout from './layout/layout.jsx';
import './App.css';
// import Login from './page/login/login'
import { Route,BrowserRouter } from 'react-router-dom'

import { withRouter } from 'react-router-dom'
import Router from './router/index'
function App() {
  const element = withRouter(Router)
  return (
    <div className="App">
      {element}
    {/* <Router></Router> */}
      {/* <Login></Login> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
