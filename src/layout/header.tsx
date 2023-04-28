import React, { useEffect, useState } from 'react';
import Router from '../router/index'
import { useParams } from 'react-router-dom';
//css引入
import './style/header.scss';
//图片引入
import Logo from '../assets/images/logo.png'
import ExternalLink from '../assets/images/external-link.png'
// import PolygonLogo from '../assets/images/icons/polygon_logo.svg'
// import DownArrow from '../assets/images/icons/down-arrow.png'
//class引入 可以判断的class名
import classNames from "classnames";
// web3modal引入需要
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon,foundry,localhost,Chain } from 'wagmi/chains'
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { useNavigate, useLocation } from 'react-router-dom'
const devChain = {
    id: 37139,
    name: "devChain",
    network: "devChain",
    nativeCurrency: {
        decimals: 18,
        name: "ether",
        // You
        // 1 minute ago• Uncommitte
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: ['http://152.32.198.202:8545'] },
        default: { http: ['http://152.32.198.202:8545'] },
    }
} as const satisfies Chain
const chains = [foundry,localhost,devChain]
const projectId = 'dba7331053371470365be9206718fb4d'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
function Header(props:any) {
    const navigate = useNavigate();
    const location = useLocation();//{hash:"",key:"poy26awo",pathname:"/",search:"",state:null}
    useEffect(() => {
        // 给未来字页面元素添加样式 （太复杂 后面再说）
        // setTimeout(() => {
        //     let gtx = document.querySelector('w3m-connect-button');
        //     let style = document.createElement("style");
        //     style.innerHTML = `w3m-button-big{color: red;}`;
        //     console.log(gtx)
        //     // gtx.shadowRoot.appendChild(style);
        // },200)
        
    }, [])
    let history=useNavigate()
    // const { id } = useParams();
    // className: this.$route.name,
    // active:false
    const [routeName, setRouteName] = useState('');
    const [active, setActive] = useState(false);
    return (
        <>
      <WagmiConfig client={wagmiClient}>
        <div  className="Header">
            <div className="header_con">
                <div className="display_align" >
                    <div className="display_align header_logo" >
                        <img src={Logo} className="cursor_pointer" onClick={() => {navigate('/') }} alt="logo" />
                        <span onClick={() => {navigate('/') }}>TBC</span>
                    </div>
                    <nav className="header_navbar">
                        <ul className="header_navbar_ulOne fontW700">
                                    <li className={classNames('header_route', { 'li_nav': location.pathname=== '/' }, 'fontW700')} onClick={() => {navigate('/') }}>
                                <span>
                                    Trade
                                </span>
                            </li>
                            <li className={classNames('header_route', { 'li_nav': location.pathname === '/Vault', }, 'fontW700', 'li_nav_duo')} onMouseOver ={() => { setActive(true) }} onMouseOut={() => { setActive(false) }} >
                                <span>
                                    Earn
                                </span>
                                <div className={classNames('hoverMenu',{'display_inline_block':active})}>
                                    <div className="hoverMenuContainer">
                                        <ul className="hoverMenuContainer_list">
                                            <li onClick={() => {navigate('/Vault')}}>Vault </li>
                                            <li >OTC </li>
                                            <li >
                                                <span>
                                                    Staking
                                                </span>
                                                <img className="link_img" src={ExternalLink} alt="" />

                                            </li>
                                            <li >Referrals </li>
                                        </ul>
                                        <div className="hoverMenuContainer_icon"></div>
                                    </div>
                                </div>
                            </li>
                            <li className={ classNames('header_route', 'fontW700' )}>
                                <span>Bridge</span>
                            </li>
                            <li className={ classNames('header_route', 'fontW700') }>
                                <span>
                                    Statistics
                                </span>
                                <img className="link_img" src={ExternalLink} alt="" />

                            </li>
                            <li className={ classNames('header_route', 'fontW700') }>
                                <span>
                                    Documentation
                                </span>
                                <img className="link_img" src={ExternalLink} alt="" />

                            </li>
                        </ul >
                    </nav >
                </div >
                <div className="menu_btns">
                    <ul className="menu_btns_ul" >
                        <li>
                            <Web3NetworkSwitch className="heaser_bbb1"/>
                            {/* <button className="menu_btns_select cursor_pointer">
                                <img className="menu_btns_select_left" src={PolygonLogo} alt="" />
                                <span className="menu_btns_select_title">Polygon</span>
                                <img className="menu_btns_select_right" src={DownArrow} alt="" />
                            </button> */}
                        </li>
                                <li style={{ position: 'relative' }} >
                                    {/* className="heaser_bbb2" */}
                            <Web3Button />
                            {/* <button className="menu_btns_icon cursor_pointer">
                                <span>Connect</span>
                                <span> Wallet</span>
                                <span className="icon-svg icon-connect"></span>
                            </button> */}
                        </li>
                        {/* <Web3Button /> */}
                    </ul>
                    <div className="header_icons">
                        <button className="header_icons_btn cursor_pointer"><span></span></button>
                    </div>
                </div>
            </div>
        </div >
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default Header;