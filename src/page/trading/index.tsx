import React, { useEffect, useState } from 'react';
import classNames from "classnames";
//css引入
import './style/index.scss';
import ReactKline from '../kline';
// 图片引入
import Dai from '../../assets/images/icons/dai.svg';
// import Gdai from '../../assets/images/icons/gdai.png' 
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Button, Web3NetworkSwitch, useWeb3ModalTheme } from '@web3modal/react'
// 滑动条测试
// import { Slider } from 'antd';
import { Col, InputNumber, Row, Slider, Space, Input, Dropdown, Table } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
// 按钮数据
import { getDataList } from "../../http/index";
// import { createWebSocket, closeWebSocket} from '../kline/js/websock';

const chains = [arbitrum, mainnet, polygon]
const projectId = 'dba7331053371470365be9206718fb4d'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
interface Cbk {
  fn?: Function
}
// console.log(useWeb3ModalTheme(),'useWeb3ModalTheme()')
export let cpk: Cbk = {};
function Trading() {
  const [columnInput, setColumnInput] = useState(50);
  const setColumnInputChange = (e: any) => {
    var value = e.target.value.replace(/[^\d]/g, '')
    setColumnInput(value)
  }
  const [inputValue, setInputValue] = useState(2);
  const [stopVal, setStopVal] = useState('')
  const [title, setTitle] = useState(true);
  const [title2, setTitle2] = useState(true);
  const [title3, setTitle3] = useState(true);
  const [title4, setTitle4] = useState(true);
  const [title5, setTitle5] = useState(true);
  const onChange = (newValue: any) => {
    console.log(newValue)
    setInputValue(newValue);
  };
  
  const stopChange = (e: any) => {
    var value = e.target.value.replace(/[^\d]/g, '')
    setStopVal(value)
  }
  const marks: SliderMarks = {
    2: '2',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
    125: '125',
    150: '150',
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  let klinesData = {}
  let params = {
    symbol: 'AUDJPY',
    type: 15,
    limit: 600,
    stop_time: 1680511864020
  }
  const items: any = [
    {
      key: '1',
      label: '1st menu item',
    },
  ]
  const { theme, setTheme } = useWeb3ModalTheme()
  useEffect(() => {
    // theme;
    setTheme({
      themeMode: 'dark',
      themeVariables: {
        '--w3m-font-family': 'Roboto, sans-serif',
        '--w3m-accent-color': 'rgb(121,76,255)',
        '--w3m-background-color': 'rgb(121,76,255)'
      }
    })
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    // setKlinesData(() => {
    //   return getKlinesData()
    // })
    getKlinesData()

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  function onRequestData(param: any, callback: any) {
    // console.log(param, 'param');

    // 判断请求参数（品种和type的变化，如果变化需要重新获取历史记录）
    if (params.symbol !== param.symbol || params.type != param.type) {
      params = { ...param }
      cpk.fn = callback
      getKlinesData()
    }

    // setParams(param)
    callback(klinesData)
  }

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    // console.log(innerWidth,innerHeight)
    return { innerWidth: innerWidth - 480, innerHeight: innerHeight - 290 - 63 - 96 };
  }
  async function getKlinesData() {
    let obj: any = {}
    let res = await getDataList(params);
    if (res) {
      // console.log(res);
      let arr: any = []
      res.data.data.records.map((item: any) => {
        let line: any = []
        for (const key in item) {
          if (key === 'time') {
            item[key] = item[key] * 1000
          } else {
            item[key] = Number(item[key])
          }
          line.push(item[key])
        }
        arr.push(line)
      })
      res.data.data.lines = arr.reverse()
      obj = res.data
      klinesData = obj

    }
  }
  const dataSource: any = [
    // {
    //   key: '1',
    //   name: '胡彦斌',
    //   age: 32,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '2',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
  ];

  const columns = [
    {
      title: 'Type',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pair',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Leverage',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Collateral',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Open price',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Liq/SL',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Take profit',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Net PnL',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Close',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState('1')
  const [index1, setIndex1] = useState('')
  const [index2, setIndex2] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [openPrice, setOpenPrice] = useState(1)
  const OnOpenPrice = (newValue: any) => {
    console.log(newValue)
    setOpenPrice(newValue);
  };
  const approve= ()=>{
    let obj = {
      trader:1, // 当前登录钱包的地址
      pairIndex:1, // 根据交易品种名称匹配所有交易对数组获取 pairIndex
      index:0, // 写死0
      initialPosSizeDai:0, // 写死0
      positionSizeDai: columnInput*Math.pow(10,18), // User Input: collateral (1e18) ==>Collateral
      openPrice:openPrice*Math.pow(10,10), // Ask/Bid (PRECISION) 1e10 ==>Price
      buy:disabled ? true:false, // User Input  buy ：long  short // true  flse
      leverage:inputValue, // User Input (PRECISION)
      tp:1, // User Input (PRECISION)
      sl:1, // User Input (PRECISION)
    }
    console.log(obj)
  }
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {/* <iframe src="https://www.tradingview.com/chart/uDMO4E63/?symbol=CME_MINI%3AES1%21" ></iframe>
        <iframe src="https://gains.trade/trading#BTC-USD" ></iframe> */}
        <div className={classNames('Tasding')}>
          {/* 左边 */}
          <div className={classNames('Tasding_king')}>
            {/* 上边  */}
            <div className={classNames('Tasding_king_img')}>
              <div className='PairSelectionContainer_container__4JaAm'>
                {/* <div className='FavoritePairsContainer_container__ZU_H7'>
                  <div className='FavoritePairsContainer_starContainer__G_6_g'>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star FavoritePairsContainer_star__0Oxoz" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                    </svg>
                  </div>
                  <div className='FavoritePairsContainer_tabsContainer__jTasa'>
                    <div style={{ filter: 'none', zIndex: 0, transition: 'transform 0ms linear 0s' }}>
                      <div className='PairTab_container__OQlsp'>
                        <div className='PairTab_pairName__84JHV'>BTC/USD</div>
                        <div className='PairTab_price__mySbF'>29855.4</div>
                      </div>
                    </div>
                    <div style={{ filter: 'none', zIndex: 0, transition: 'transform 0ms linear 0s' }}>
                      <div className='PairTab_container__OQlsp'>
                        <div className='PairTab_pairName__84JHV'>EUR/USD</div>
                        <div className='PairTab_price__mySbF'>29855.4</div>
                      </div>
                    </div>
                    <div style={{ filter: 'none', zIndex: 0, transition: 'transform 0ms linear 0s' }}>
                      <div className='PairTab_container__OQlsp'>
                        <div className='PairTab_pairName__84JHV'>AAPL/USD</div>
                        <div className='PairTab_price__mySbF PairTab_positive_K4m_H'>29855.4</div>
                      </div>
                    </div>
                    <div style={{ filter: 'none', zIndex: 0, transition: 'transform 0ms linear 0s' }}>
                      <div className='PairTab_container__OQlsp'>
                        <div className='PairTab_pairName__84JHV'>SPY/USD</div>
                        <div className='PairTab_price__mySbF'>29855.4</div>
                      </div>
                    </div>
                    <div style={{ filter: 'none', zIndex: 0, transition: 'transform 0ms linear 0s' }}>
                      <div className='PairTab_container__OQlsp'>
                        <div className='PairTab_pairName__84JHV'>XAU/USD</div>
                        <div className='PairTab_price__mySbF PairTab_positive_K4m_H'>29855.4</div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className='CurrentPairInfo_container__JHYj6'>
                  <div className='CurrentPairInfo_mainRow__KICmC'>
                    <Dropdown menu={{ items }}>
                      <a className='PairDropdownToggle_name__G5rOV' onClick={(e) => e.preventDefault()}>
                        <Space>
                          EOS/USD
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                  {/* <div className='CurrentPrice_price__VV3lg'>
                    <h4>1.08405</h4>
                    <span className='CurrentPrice_negative__SbdRv CurrentPrice_positive__18E8h'>+4.48%</span>
                  </div>
                  <div className='CurrentPairStats_container__z9UTi'>
                    <div className='CurrentPairStats_infoRow__jjQqC indiana-scroll-container indiana-scroll-container--hide-scrollbars'>
                      <div className='Tooltip_tooltipCursor CurrentPairStats_pairField__NcAn6'>
                        <h5>Open Interest (l)</h5>
                        <span>0 / 1M</span>
                      </div>
                      <div className='Tooltip_tooltipCursor CurrentPairStats_pairField__NcAn6'>
                        <h5>Open Interest (s)</h5>
                        <span>0 / 1M</span>
                      </div>
                      <div className='Tooltip_tooltipCursor CurrentPairStats_pairField__NcAn6'>
                        <h5>Funding(l)</h5>
                        <span>0%</span>
                      </div>
                      <div className='Tooltip_tooltipCursor CurrentPairStats_pairField__NcAn6'>
                        <h5>Funding(s)</h5>
                        <span>0%</span>
                      </div>
                      <div className='Tooltip_tooltipCursor CurrentPairStats_pairField__NcAn6'>
                        <h5>Rollover</h5>
                        <span>0.0299%</span>
                      </div>
                    </div>
                    <div className='ModeDropdownToggle_toggleButton__xI1ff'>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="grid-2" className="svg-inline--fa fa-grid-2 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path fill="currentColor" d="M80 64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H80zM32 80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V80zM80 320c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V336c0-8.8-7.2-16-16-16H80zM32 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V336zM432 64H336c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16zM336 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm0 288c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V336c0-8.8-7.2-16-16-16H336zm-48 16c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48V336z"></path>
                      </svg>
                    </div>
                  </div> */}
                </div>
              </div>
              <ReactKline
                width={windowSize.innerWidth}
                height={windowSize.innerHeight}
                ranges={["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]}
                symbol={"AUDJPY"}
                symbolName={"AUDJPY/USD"}
                intervalTime={10000}
                depthWidth={100}
                debug={false}
                onRequestData={onRequestData}
              />
              {/* <ReactKline
                width={600}
                height={400}
                ranges={["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]}
                symbol={"BTC"}
                symbolName={"BTC/USD"}
                intervalTime={5000}
                depthWidth={100}
                debug={false}
                onRequestData={onRequestData}
              /> */}

            </div>
            {/* 下边 */}
            <div className={classNames('Tasding_king_bottom')}>
              <div className='Tasding_king_bottom_row'>
                <div className='Tasding_king_bottom_row_head'>
                  <div className='row_head_title'>
                    <div className='trades-active-title frist_title'>
                      <p className='ta-c toberemoved'>
                        Trades (0)
                      </p>
                    </div>
                    <div className='frist_title'>
                      <p className='ta-c toberemoved'>
                        Orders (0)
                      </p>
                    </div>
                  </div>
                  <div className='TradesContainer_headerRight__YqEdz'>
                    <div className='TradesContainer_showAllToggle__MLuKA'>All</div>
                  </div>
                </div>
                <div className='Tasding_king_bottom_row_table'>
                  <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
              </div>
            </div>
          </div>
          {/* 右边 */}
          <div className={classNames('Tasding_data')}>
            <ul className={classNames('Tasding_data_title')}>
              <li className={classNames(disabled ? '' : 'active')} onClick={() => { setDisabled(false) }}>Long</li>
              <li className={classNames(disabled ? 'short' : '')} onClick={() => { setDisabled(true) }}>Short</li>
            </ul>
            <div className={classNames('Tasding_data_content')}>
              <ul className={classNames('Tasding_data_content_row')}>
                <li onClick={() => {
                  setActive(false)
                  setIndex('1')
                }} className={classNames((index == '1' ? 'active' : ''))}>Market</li>
                <li className={classNames((index == '2' ? 'active' : ''))} onClick={() => {
                  setActive(true)
                  setIndex('2')
                }}>Limit</li>
                <li className={classNames((index == '3' ? 'active' : ''))} onClick={() => {
                  setActive(true)
                  setIndex('3')
                }}>Stop</li>
              </ul>
              <div className={classNames('Tasding_data_content_row2')}>
                <div className={classNames('Tasding_data_content_row2_top')}>
                  <label>
                    Collateral
                    <span> (50 - 125k)</span>
                  </label>
                  <div>

                  </div>
                </div>
                <div className={classNames('Tasding_data_content_row2_btn')}>
                  {/* maxlength="6" autocomplete="off" */}
                  <input type="text" pattern="^([0-9]+(?:[.,][0-9]*)?)$" value={columnInput} onChange={(e) => setColumnInputChange(e)} />
                  <span>
                    <img src={Dai} alt="" />
                  </span>
                </div>
              </div>
              <div className={classNames('Tasding_data_content_row3')}>
                <div className='Tasding_data_content_row3_top'>
                  <p>
                    Leverage
                    <span>(2x- 150x)</span>
                  </p>
                  <InputNumber min={2} max={150} style={{ margin: '0 16px' }} value={inputValue} onChange={onChange} />
                </div>
                <div className='Tasding_data_content_row3_bottom'>
                  <Slider marks={marks} min={2} max={150} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} />
                </div>
              </div>
              <div className={classNames('Tasding_data_content_row4')}>
                <div className={classNames('Tasding_data_content_row4_left')}>
                  <p className={classNames('Tasding_data_content_row4_left_1')}>
                    Price
                  </p>
                  {
                    active ? <InputNumber min={2} max={150} style={{ margin: '0 16px' }} value={openPrice} onChange={OnOpenPrice} /> :
                      <p className={classNames('Tasding_data_content_row4_left_2')}>
                        {openPrice}
                      </p>
                  }
                </div>
                <div className={classNames('Tasding_data_content_row4_right')}>
                  <p>
                    Slippage
                    <span>
                      (%)
                    </span>
                  </p>
                  {
                    active ? <p style={{ textAlign: 'center' }} className={classNames('Tasding_data_content_row4_left_2')}>
                      2
                    </p> :
                      <InputNumber min={2} max={150} style={{ margin: '0 16px' }} value={inputValue} onChange={onChange} />
                  }
                </div>
              </div>
              <div className={classNames('Tasding_data_content_row5')}>
                <div className={classNames('Tasding_data_content_row5_top')}>
                  <p >
                    Stop loss
                    <span className='tc-danger'>
                      (None)
                    </span>
                  </p>
                  <p className={classNames(' tc-danger')}>
                    None
                  </p>
                </div>
                <div className={classNames('Tasding_data_content_row5_bottom')}>
                  <div className={classNames(index1 == '1' ? 'active' : '')} onClick={() => { setIndex1('1') }}>NONE</div>
                  <div className={classNames(index1 == '2' ? 'active' : '')} onClick={() => { setIndex1('2') }}>-10%</div>
                  <div className={classNames(index1 == '3' ? 'active' : '')} onClick={() => { setIndex1('3') }}>-25%</div>
                  <div className={classNames(index1 == '4' ? 'active' : '')} onClick={() => { setIndex1('4') }}>-50%</div>
                  <div className={classNames(index1 == '5' ? 'active' : '')} onClick={() => { setIndex1('5') }}>-75%</div>
                  <input type="text" placeholder="PRICE" pattern="^([0-9]+(?:[.,][0-9]*)?)$" value={stopVal} onChange={(e) => stopChange(e)} />
                </div>
              </div>
              <div className={classNames('Tasding_data_content_row6_bun')}>
                <div className='Tasding_data_content_row6_top'>
                  <p >
                    Take profit
                    <span className='tc-success'>
                      (5.69937)
                    </span>
                  </p>
                  <p className={classNames(' tc-success')}>
                    +450.0 DAI
                  </p>
                </div>
                <div className={classNames('Tasding_data_content_row6_bottom')}>
                  <div className={classNames(index2 == '1' ? 'active' : '')} onClick={() => { setIndex2('1') }}>25%</div>
                  <div className={classNames(index2 == '2' ? 'active' : '')} onClick={() => { setIndex2('2') }}>50%</div>
                  <div className={classNames(index2 == '3' ? 'active' : '')} onClick={() => { setIndex2('3') }}>100%</div>
                  <div className={classNames(index2 == '4' ? 'active' : '')} onClick={() => { setIndex2('4') }}>300%</div>
                  <div className={classNames((index2 == '5' ? 'active' : ''), (disabled ? 'disabled-select' : ''))} onClick={() => { setIndex2('5') }}>900%</div>
                  <input type="text" placeholder="PRICE" pattern="^([0-9]+(?:[.,][0-9]*)?)$" value={stopVal} onChange={(e) => stopChange(e)} />
                </div>
              </div>
              <div className={classNames('Tasding_data_content_row7')}>
                <Web3Button />
                <button onClick={() => { setDisabled(false) }}>APPROVE</button>
              </div>
              <div style={{ marginTop: 20, marginBottom: 8 }} className='Tasding_data_content_row8 TradingPanel_orderStatus__ZRa1_'>
                <span>EOS/USD</span>
                <span className='tc-danger'>Wallet not connected</span>
              </div>
              <div style={{ marginBottom: 8 }} className='Tasding_data_content_row8 '>
                <span className='Tooltip_tooltipCursor' onMouseOut={() => { setTitle(true) }} onMouseOver={() => { setTitle(false) }}>Est. Execution Price
                  <div className={classNames({ 'displayNone': title })}>
                    The estimated price including spread at which your trade will execute.
                  </div>
                </span>
                <span className='tc-danger'>1.0565</span>
              </div>
              <div style={{ marginBottom: 8 }} className='Tasding_data_content_row8 '>
                <span className='Tooltip_tooltipCursor' onMouseOut={() => { setTitle2(true) }} onMouseOver={() => { setTitle2(false) }}>Spread
                  <div className={classNames({ 'displayNone': title2 })}>
                    Current market spread
                  </div>
                </span>
                <span className='tc-danger'>0.00%</span>
              </div>
              <div style={{ marginBottom: 8 }} className='Tasding_data_content_row8 '>
                <span className='Tooltip_tooltipCursor' onMouseOut={() => { setTitle3(true) }} onMouseOver={() => { setTitle3(false) }}>Position Size
                  <div className={classNames({ 'displayNone': title3 })}>
                    Collateral * Leverage
                  </div>
                </span>
                <span className='tc-danger'>100 DAI</span>
              </div>
              <div style={{ marginBottom: 8 }} className='Tasding_data_content_row8 '>
                <span className='Tooltip_tooltipCursor' onMouseOut={() => { setTitle4(true) }} onMouseOver={() => { setTitle4(false) }}>Fees
                  <div className={classNames({ 'displayNone': title4 })}>
                    Learn more
                  </div>
                </span>
                <span className='tc-danger'>0.1 DAI</span>
              </div>
              <div style={{ marginBottom: 8 }} className='Tasding_data_content_row8 '>
                <span className='Tooltip_tooltipCursor' onMouseOut={() => { setTitle5(true) }} onMouseOver={() => { setTitle5(false) }}>Liq. Price
                  <div className={classNames({ 'displayNone': title5 })}>
                    If this price is reached, your position will be
                    closed and your collateral lost.
                  </div>
                </span>
                <span className='tc-danger'>0.581075</span>
              </div>
            </div>

          </div>
        </div>
        {/* <Web3NetworkSwitch /> */}
        {/* <Web3Button /> */}
      </WagmiConfig>

      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}



export default Trading;