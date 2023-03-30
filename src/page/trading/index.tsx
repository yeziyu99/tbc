import React from 'react';
import HomePage from './indexq';
import ReactKline from '../kline';
// import HomePage from './indexq';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import{ Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { useEffect, useState } from 'react';
import { getDataList } from "../../http/index";

const chains = [arbitrum, mainnet, polygon]
const projectId = 'dba7331053371470365be9206718fb4d'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function onRequestData(param:any,callback:any) {
    // console.log(param);
    getDataList(param).then(res => {
      // console.log(res.data)
      let arr: any = []
      res.data.data.records.map( (item: any) => {
        let line: any = []
        for (const key in item) {
          if(key === 'time') {
            item[key] = item[key] * 1000
          } else {
            item[key] = Number(item[key])
          }
          line.push(item[key])
        }
        arr.push(line)
      })
      res.data.data.lines = arr.reverse()
      callback(res.data)
    })
}

function Trading() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <>
      <ReactKline
          width={windowSize.innerWidth}
          height={windowSize.innerHeight}
          ranges={["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]}
          symbol={"AUDJPY"}
          symbolName={"AUDJPY/USD"}
          intervalTime={300000}
          depthWidth={100}
          debug={false}
          onRequestData={onRequestData}
      />
      <WagmiConfig client={wagmiClient}>
        {/* <Web3NetworkSwitch /> */}
        {/* <Web3Button /> */}
      </WagmiConfig>

      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth: innerWidth - 300, innerHeight: innerHeight - 260};
}


export default Trading;