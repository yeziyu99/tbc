import React, { Component } from 'react'
// 导入所需组件
import Vault from '../page/vault'
import Trading from '../page/trading'
import Layout from '../layout/layout'
// 导入路由依赖
import { Route,BrowserRouter } from 'react-router-dom'
 
export default class index extends Component {
  render() {
    return (
        // 使用BrowserRouter包裹，配置路由
      <BrowserRouter>
         {/* 使用/配置路由默认页；exact严格匹配 */}
        <Route render={props=><Trading {...props} />} path='/' exact></Route>
        <Route render={props=><Vault {...props} />} path='/Vault'></Route>
        <Route render={props=><Layout {...props} />} path='/Layout'></Route>
        <Route render={props=><Trading {...props} />} path='/Trading'></Route>
      </BrowserRouter>
    )
  }
}