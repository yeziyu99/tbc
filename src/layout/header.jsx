import React, { useEffect, useState } from 'react';
import Router from '../router/index'
import { useParams } from 'react-router-dom';



// import './style/login.scss';
import Logo from '../assets/images/logo.png'
import ExternalLink from '../assets/images/external-link.png'
import PolygonLogo from '../assets/images/icons/polygon_logo.svg'
import DownArrow from '../assets/images/icons/down-arrow.png'
import classNames from "classnames";
import style from "./style/header.scss";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import{ Web3Button, Web3NetworkSwitch } from '@web3modal/react'
const chains = [arbitrum, mainnet, polygon]
const projectId = 'dba7331053371470365be9206718fb4d'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
// import { Web3Button } from '@web3modal/react'

// function HomePage() {
//   return 
// }
function Header(props) {
    useEffect(() => {
        // setTimeout(() => {
        //     let gtx = document.querySelector('w3m-connect-button');
        //     let style = document.createElement("style");
        //     style.innerHTML = `w3m-button-big{color: red;}`;
        //     console.log(gtx)
        //     // gtx.shadowRoot.appendChild(style);
        // },200)
        
    }, [])
    // const { id } = useParams();
    // className: this.$route.name,
    // active:false
    const [routeName, setRouteName] = useState('');
    const [active, setActive] = useState(false);
    const jumpFun = (route) => {
        // history.push('/questionnaire/createques')
        // if (this.$route.name != route) {
        //     this.$router.push(route);
        // }
    }
    return (
        <>
      <WagmiConfig client={wagmiClient}>
        <div  className="Header">
            <div className="header_con">
                <div className="display_align" >
                    <div className="display_align header_logo" >
                        <img src={Logo} className="cursor_pointer" onClick={() => { jumpFun('home') }} alt="logo" />
                        <span>TBC</span>
                    </div>
                    <nav className="header_navbar">
                        <ul className="header_navbar_ulOne fontW700">
                            <li className={classNames( 'header_route',{'li_nav': routeName === 'trading'},'fontW700')} onClick={() => { jumpFun('home') }}>
                                <span>
                                    Trade
                                </span>
                            </li>
                            <li className={classNames('header_route', { 'li_nav': routeName === 'vault', }, 'fontW700', 'li_nav_duo')} onMouseOver ={() => { setActive(true) }} onMouseOut={() => { setActive(false) }} >
                                <span>
                                    Earn
                                </span>
                                <div className={classNames('hoverMenu',{'display_inline_block':active})}>
                                    <div className="hoverMenuContainer">
                                        <ul className="hoverMenuContainer_list">
                                            <li onClick={() => { jumpFun('home') }}>Vault </li>
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
                            <li className={ classNames('header_route', {'li_nav': routeName === 'bridge'},'fontW700' )} onClick={() => { jumpFun('home') }}>
                                <span>Bridge</span>
                            </li>
                            <li className={ classNames('header_route', 'fontW700') } onClick={() => { jumpFun('home') }}>
                                <span>
                                    Statistics
                                </span>
                                <img className="link_img" src={ExternalLink} alt="" />

                            </li>
                            <li className={ classNames('header_route', 'fontW700') } onClick={() => { jumpFun('home') }}>
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
                        <li style={{position: 'relative'}} >
                            <Web3Button className="heaser_bbb2"/>
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