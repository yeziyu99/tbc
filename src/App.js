// import logo from './logo.svg';
import Layout from './layout/layout.jsx';
import './App.css';
// import Login from './page/login/login'
import { Route,BrowserRouter ,renderRoutes} from 'react-router-dom'

import Router from './router/index'
function App() {
  return (
    <div className="App">
      <Layout></Layout>
    {/* <Router></Router> */}
    {/* <BrowserRouter> */}
      {
        Router.map((item)=>{
          return <Route render={()=><item.component {...item.meta} />} key={item.path} path={item.path} exact></Route>
        })
      }
    {/* </BrowserRouter> */}
    {/* <BrowserRouter >{renderRoutes(Router)}</BrowserRouter> */}
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
