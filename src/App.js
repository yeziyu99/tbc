// import logo from './logo.svg';
import Layout from "./layout/layout.jsx";
// import 'antd/dist/reset.css';
import "./App.css";
// import Login from './page/login/login'
import { Route, BrowserRouter, renderRoutes, Routes,Navigate } from "react-router-dom";
import { useNavigate, useLocation, useRouteMatch, useParams, } from 'react-router-dom'
import Trading from './page/trading'
import Router from "./router/index";
function App() {
  const location = useLocation()
  let arr = []
  const Routers = () => {
    Router.forEach(item => {
      arr.push(item.path)
    })
    const targetRouterConfig = Router.find((v) => v.path === location.pathname)
    if (targetRouterConfig) {
      return (
        <>
          <Routes>
            {Router.map((item) => {
              return (
                <Route
                  element={<item.component />}
                  key={item.path}
                  path={item.path}
                  exact
                ></Route>
              );
            })}
            <Route to='/404' component={Trading} />
          </Routes>
        </>
      )
    } else {
      return <>
      <Navigate to='/'></Navigate>
      </>
    }
  }
  // for (var i = 0; i < Router.length; i++) {
  //   if (location.pathname == Router[i].path) {
  //     navigate(location.pathname);
  //   } else {
  //     console.log('first')
  //     navigate('/');
  //   }
  // }

  return (
    <div className="App">
      <Layout></Layout>
      <Routers></Routers>
    </div>
  );
}

export default App;
