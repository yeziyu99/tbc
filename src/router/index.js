import React, { Component } from 'react'
// 导入所需组件
import Vault from '../page/vault'
import Trading from '../page/trading'
import Text from '../page/text'
import Layout from '../layout/layout'
// 导入路由依赖
import { Route,BrowserRouter } from 'react-router-dom'

const Router=[
  {
    path:'/',
    name:'Trading',
    element:<Trading />,
    component:Trading,
    meta:{title:'Trading' }
  },
  {
    path:'/Vault',
    name:'Vault',
    element:<Vault />,
    component:Vault,
    children:[]
  },
  {
    path:'/Text',
    name:'Text',
    element:<Text />,
    component:Text,
    children:[]
  },
  {
    path: '/404',
    element:<Trading />,
    component:Trading,
}
]
 export default Router


 
// export default class index extends Component {
//   render() {
//     return (
//         // 使用BrowserRouter包裹，配置路由
//       <BrowserRouter>
//          {/* 使用/配置路由默认页；exact严格匹配 */}
//         <Route render={props=><Vault {...props} />} path='/' exact></Route>
//         <Route render={props=><Vault {...props} />} path='/Vault'></Route>
//         <Route render={props=><Layout {...props} />} path='/Layout'></Route>
//         <Route render={props=><Trading {...props} />} path='/Trading'></Route>
//       </BrowserRouter>
//     )
//   }
// }
