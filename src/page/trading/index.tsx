import React from 'react';
// import HomePage from './indexq';
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
function Trading() {
  return (
    <>
      111
      <WagmiConfig client={wagmiClient}>
        {/* <Web3NetworkSwitch /> */}
        <Web3Button />
      </WagmiConfig>

      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}

export default Trading;