import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import Profile from './Profile'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
 [mainnet],
 [alchemyProvider({ apiKey: 'dba7331053371470365be9206718fb4d' }), publicProvider()],
)

// Set up client
const client = createClient({
 autoConnect: true,
 connectors: [
 new MetaMaskConnector({ chains }),
 new CoinbaseWalletConnector({
 chains,
 options: {
 appName: 'wagmi',
 },
 }),
 new WalletConnectConnector({
 chains,
 options: {
 projectId: 'dba7331053371470365be9206718fb4d',
 },
 }),
 new InjectedConnector({
 chains,
 options: {
 name: 'Injected',
 shimDisconnect: true,
 },
 }),
 ],
 provider,
 webSocketProvider,
})

// Pass client to React Context Provider
function Text() {
 return (
 <WagmiConfig client={client}>
 <Profile />
 </WagmiConfig>
 )
}
export default Text;

