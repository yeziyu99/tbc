// import logo from './logo.svg';
import Layout from "./layout/layout.jsx";
import 'antd/dist/reset.css';
import "./App.css";
// import Login from './page/login/login'
import { Route, BrowserRouter, renderRoutes, Routes } from "react-router-dom";

import Router from "./router/index";
function App() {
  return (
    <div className="App">
      <Layout></Layout>
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
      </Routes>
    </div>
  );
}

export default App;
