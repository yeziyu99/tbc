import { Web3Button } from '@web3modal/react'
import { useWeb3Modal } from "@web3modal/react";

// const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

// // Modal's open state
// isOpen;

// // Open modal
// interface Options {
//   route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
// }
// open();

// // Close modal
// close();

// Sets the default chain BEFORE user is connected.
// Use wagmi network get / switch action AFTER user is connected.
// Default chain will be `mainnet` or first wagmi chain in config if `mainnet` is not available.
// setDefaultChain(polygon);
function HomePage() {
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  console.log(isOpen);
  console.log(useWeb3Modal(),'useWeb3Modal');
  return <Web3Button />
}
export default HomePage;
