// import React from 'react';
import React, { useEffect, useState } from 'react';
import './style/index.scss';
import classNames from "classnames";
import Dai from '../../assets/images/icons/dai.svg'
import Gdai from '../../assets/images/icons/gdai.png'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useNavigate, useLocation, useRouteMatch, useParams, } from 'react-router-dom'
function Vault() {
    // console.log(,'pppp')
    // useNavigate('/')
    useEffect(() => {
        
    }, [])
    const [btnTag, setBtnTag] = useState('deposit');
    const [title, setTitle] = useState(true);
    const [title2, setTitle2] = useState(true);
    const [btnTagTwo, setBtnTagTwo] = useState('deposit');
    const [columnInput, setColumnInput] = useState(0);
    const [columnInput2, setColumnInput2] = useState(0);
    const [columnInput3, setColumnInput3] = useState(0);
    const setColumnInputChange = (e) => {
        var value=e.target.value.replace(/[^\d]/g, '')
        setColumnInput(value)
    }
    const setColumnInput2Change = (e) => {
        var value=e.target.value.replace(/[^\d]/g, '')
        setColumnInput2(value)
    }
    const setColumnInput3Change = (e) => {
       var value=e.target.value.replace(/[^\d]/g, '')
        setColumnInput3(value)
    }
    return (
        <div className="vault">
            <div className="vault_container">
                <div className="vault_container_con">
                    <div className="vault_container_con_left">
                        <div className="vault_container_con_left_title">
                            <h1 className="vault_container_con_left_titles" onClick={()=>{
                                // navigate('/')
                            }}>
                                <span>gDAI</span>
                                Vault
                            </h1>
                            <span>
                                16.5% APY
                            </span>
                        </div>
                    </div>
                    <div className="vault_container_con_bottom">
                        <div className="vault_container_con_right_top">
                            <div>
                                <h2>Epoch 30</h2>
                                <span>Remaining:2d 17h 22m</span>
                            </div>
                            <div>
                                <span>Start</span>
                                <h2>2023/3/13 04/11</h2>
                            </div>
                            <div>
                                <span>End</span>
                                <h2>2023/3/13 04/11</h2>
                            </div>
                        </div>
                        <div className="vault_container_con_right_bottom">
                            <div>
                                <span>TVL</span>
                                <h2>
                                    14,968,405
                                    <img src={Dai} alt="" />
                                </h2>
                            </div>
                            <div>
                                <span>Collat Ratio</span>
                                <h2>
                                    109.54%
                                </h2>
                            </div>
                            <div>
                                <span>gDAI price</span>
                                <h2>
                                    1.02702
                                    <img src={Dai} alt="" />
                                </h2>
                            </div>
                            <div>
                                <span>gDAI Supply</span>
                                <h2>
                                    14,574,482
                                    <img src={Gdai} alt="" />
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="vault_panel">
                <h2 className="">
                    Your stats(disconnected)
                </h2>
                <div className="vault_panel_row__rHdwI">
                    <div className="vault_panel_values__Qul9W">
                        <div className="vault_panel_column__infWN">
                            <span className="vault_panel_column__infWN_title">Available</span>
                            <span className="vault_panel_column__infWN_numImg">
                                0
                                <img src={Gdai} alt="" />
                            </span>
                        </div>
                        <div className="vault_panel_column__infWN">
                            <span className="vault_panel_column__infWN_title">Locked</span>
                            <span className="vault_panel_column__infWN_numImg">
                                0
                                <img src={Gdai} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="vault_panel_values__Qul9W">
                        <div className="vault_panel_column__infWN">
                            <span className="vault_panel_column__infWN_title vault_panel_column__infWN_title_border Tooltip_tooltipCursor" onMouseOut={()=>{setTitle(true)}} onMouseOver ={() => { setTitle(false) }}>
                                Total Value
                                <div className={classNames({'displayNone':title})}>
                                    Total value of your gDAl
                                </div>
                            </span>
                            <span className="vault_panel_column__infWN_numImg">
                                0
                                <img src={Dai} alt="" />
                            </span>
                        </div>
                        <div className="vault_panel_column__infWN">
                            <span className="vault_panel_column__infWN_title vault_panel_column__infWN_title_border Tooltip_tooltipCursor" onMouseOut={()=>{setTitle2(true)}} onMouseOver ={() => { setTitle2(false) }}>
                                Est. Earnings
                                <div style={{top:'-100px'}} className={classNames({'displayNone':title2})}>
                                    Calculated based on current market value of gDAI holdings and the total DAI deposited and withdrawn.
                                </div>
                            </span>
                            <span className="vault_panel_column__infWN_numImg">
                                0
                                <img src={Dai} alt="" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="vault_panel_row_sKduG">
                    <button className={classNames('vault_panel_row_btn', { 'vault_panel_row_btn_tag': btnTag == 'deposit' })} onClick={() => { setBtnTag('deposit'); setBtnTagTwo('deposit')}}>
                        Deposit
                    </button>
                    <button className={classNames('vault_panel_row_btn', { 'vault_panel_row_btn_tag': btnTag == 'withdraw' })} onClick={() => { setBtnTag('withdraw') }}>
                        Withdraw
                    </button>
                    <button className={classNames('vault_panel_row_btn', { 'vault_panel_row_btn_tag': btnTag == 'unlock' })} onClick={() => { setBtnTag('unlock') }}>
                        Unlock
                    </button>
                </div >
            </div >
            <div className={classNames('vault_panel', 'vault_panel_col',{'displayNone':btnTag == 'unlock'})}>
                <div className={classNames('vault_panel_column', 'vault_panel_column_text',{'displayNone':!(btnTag=='deposit'&&btnTagTwo=='deposit')}) } >
                    <h2>Deposit</h2>
                    <p>
                        Deposit DAI in exchange for gDAI, an ERC-20 representing your ownership in the vault.
                    </p>
                    <p>
                        Stakers receive fees from each trade placed on the platform in exchange for serving as the counterparty to all
                        trades.
                    </p>
                    <p>
                        gDAI accumulates these fees in real-time.
                    </p>
                    <div>
                        Please be aware, you can't immediately withdraw your assets. Withdraws follow an epoch system described on the
                        <button onClick={() => { setBtnTag('withdraw') }}>
                            Withdraw panel.
                        </button>
                    </div>
                </div>
                <div className={classNames('vault_panel_column', 'vault_panel_column_text',{'displayNone':!(btnTag == 'deposit' && btnTagTwo == 'deposits')})}>
                    <h2>Deposit with discount & lock</h2>
                    <p>
                        Deposit DAI in exchange for an NFT with rights to locked gDAI.
                    </p>
                    <p>
                        Discount is based on the vaults current collateralization ratio and specified lock duration.
                    </p>
                    <p>
                        Unlock your deposit anytime after your unlock date to receive your gDAI.
                    </p>
                    <p>
                        gDAI accumulates fees while locked.
                    </p>
                    <div>
                        Please be aware, you can't immediately withdraw your assets. Withdraws follow an epoch system described on the
                        <button onClick={() => { setBtnTag('withdraw') }}>
                            Withdraw panel.
                        </button>
                    </div>
                </div>
                <div className={classNames('vault_panel_column', 'vault_panel_column_text',{'displayNone':!(btnTag == 'withdraw')})}>
                    <h2>Withdraw Requests</h2>
                    <p>
                        Withdraws follow an epoch system. Each epoch is
                        <b>72</b>
                        hours long. You can make a request to withdraw your assets during the first
                        <b>48</b>
                        hours of any epoch, but you must wait until a specific withdraw epoch to actually withdraw them.
                    </p>
                    <p>
                        Depending on the collateralization ratio of the vault, your withdraw epoch will be between
                        <b>1</b> and <b>3</b> epochs later.
                    </p>
                    <p>
                        You must withdraw your assets in the first
                        <b>48</b>
                        hours of your withdraw epoch, otherwise a new request is required.
                    </p>

                    <div style={{textAlign: 'center'}}>
                        Remaining time to withdraw in current epoch:
                        <br />
                        <span style={{fontWeight: 700,color: 'var(--text-light)'}}>9h 19m 40s</span>
                    </div>
                </div>
                <div className={classNames('vault_panel_column',{'displayNone':!(btnTag == 'deposit')})}>
                    <div className="vault_panel_column_typeWrapper">
                        <div>
                            <button className={classNames('left', { 'btn_tag': btnTagTwo == 'deposit' })}
                                onClick={() => { setBtnTagTwo('deposit') }} >Deposit</button>
                            <button className={classNames('right', { 'btn_tag': btnTagTwo == 'deposits' })} onClick={() => { setBtnTagTwo('deposits') }}>Deposit
                                with
                                discount & lock </button>
                        </div>
                    </div >
                    <div className="vault_panel_column_input">
                        <div className="vault_panel_column_input_label">
                            <label>Deposit</label>
                            <div>
                                <span>
                                    0
                                    <button>MAX</button>
                                </span>
                            </div>
                        </div>
                        <div className="vault_panel_column_input_row">
                            
                            <input type="number" name="" id=""  value={columnInput} onChange={(e) => setColumnInputChange(e)}/>
                            <span>
                                <img src={Dai} alt="" />
                                DAL
                            </span>
                        </div>
                    </div>
                    <div className={classNames('vault_panel_column_section',{'displayNone':!(btnTagTwo == 'deposits')})}>
                        <span>Lock Duration</span>
                        <div className="box-select">
                            <div>30 DAYS</div>
                            <div>180 DAYS</div>
                            <div>365 DAYS</div>
                            
                            <input type="number" className="active box-select-input"  placeholder="Custom" value={columnInput2} onChange={(e) => setColumnInput2Change(e)}/>
                        </div>
                    </div>
                    <div className={classNames('vault_panel_column_section','vault_panel_column_discount',{'displayNone':!(btnTagTwo == 'deposits')})} >
                        <span>
                            Discount:
                            <span>0%</span>
                        </span>
                    </div>
                    <div className="vault_panel_column_section">
                        <span>You Receive</span>
                        <div>
                            <span className={classNames({ 'displayNone': !(btnTagTwo == 'deposit') })}>{columnInput * 9579 / 10000}</span>
                            <span className={classNames({ 'displayNone': !(btnTagTwo == 'deposits') })}>1 gNFT-DAI</span>
                            <span>
                                <div>
                                    <span className={classNames({ 'displayNone': !(btnTagTwo == 'deposits') })}>
                                        {columnInput * 9579 / 10000}
                                    </span>
                                    <img src={Gdai} alt="" />
                                    gDAI
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="vault_panel_column_section">
                        <span>1 DAI = 0.9579 gDAI</span>
                    </div>
                    <div className="vault_panel_column_btn">
                        <button className={classNames({ 'value': columnInput })}>
                            {columnInput ? 'Approve' : 'Submit'}
                        </button>
                    </div >
                </div >
                <div className={classNames('vault_panel_column','vault_panel_column_withdraw',{'displayNone':!(btnTag == 'withdraw')})}>
                    <div className="vault_panel_column_typeWrapper">
                        <div>
                            You must make a request to withdraw assets
                        </div>
                    </div>
                    <div className="vault_panel_column_withdraw_row2">
                        <div>
                            <span style={{color: 'var(--text-light)'}}>
                                Current Wait Period:
                            </span>
                            <span style={{fontWeight: 700}}>
                                3 epochs
                            </span>
                        </div>
                        <div className="vault_panel_column_withdraw_row3">
                            <span style={{color: 'var(--text-light)'}}>Withdraw Date:</span>
                            <span className="withdraw_time"> 2023/3/29</span>
                        </div>
                    </div>
                    <div className="vault_panel_column_input">
                        <div className="vault_panel_column_input_label">
                            <label>Redeem</label>
                            <div>
                                <span>
                                    0
                                    <button>MAX</button>
                                </span>
                            </div>
                        </div>
                        <div className="vault_panel_column_input_row">
                            {/* pattern="^([0-9]*(?:[.][0-9]*)?)$" tabindex="0" autocomplete="off" lang="en" pattern={'^([0-9]*(?:[.][0-9]*)?)$'} tabindex={'0'} autocomplete={'off'} */}
                            <input type="number" name="" id=""  value={columnInput3} onChange={(e) => setColumnInput3Change(e)}/>
                            <span>
                                <img src={Gdai} alt="" />
                                gDAI
                            </span>
                        </div>
                    </div>
                    <div className={classNames('vault_panel_column_section','vault_panel_column_discount',{'displayNone':!(btnTagTwo == 'deposits')})}>
                        <span>
                            Discount:
                            <span>0%</span>
                        </span>
                    </div>
                    <div className="vault_panel_column_section">
                        <span>Current value:{columnInput3 * 10449 / 10000}
                            <img src={Dai} alt="" />
                        </span>
                    </div>
                    <div className="vault_panel_column_section">
                        <span>1 gDAI = 1.0449 DAI</span>
                    </div>
                    <div className="vault_panel_column_btn">
                        <button>
                            Request
                        </button>
                    </div>
                    <div className="vault_panel_column_withdraw_footer">
                        <h3>Existing Requests (0)</h3>
                    </div>
                </div>
            </div >
            <div className={classNames('vault_faqLink',{'displayNone':btnTag != 'unlock'})}>
                No locked deposits
            </div>
            <div className="vault_faqLink">
                Have questions? Please ask in
                <span> Telegram </span>
                or see the
                <span> Vault FAQ </span>
            </div>
        </div >
    );
}

export default Vault;