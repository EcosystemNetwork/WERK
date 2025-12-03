import React from 'react'
import './App.css'
import { LaserEyesProvider, MAINNET, useLaserEyes, UNISAT } from '@omnisat/lasereyes'
import { Dashboard } from '@omnisat/lasereyes-ui'
import '@omnisat/lasereyes-ui/style'

function WalletContent() {
  const { connected, connect, disconnect, address } = useLaserEyes()

  if (connected) {
    return <Dashboard onDisconnect={disconnect} />
  }

  return (
    <div className="connect-container">
      <h1>Welcome to Laser Eyes</h1>
      <p>Connect your wallet to access the futuristic dashboard</p>
      <button
        className="connect-btn"
        onClick={() => connect(UNISAT)}
      >
        Connect Wallet
      </button>
    </div>
  )
}

function App() {
  return (
    <LaserEyesProvider config={{ network: MAINNET }}>
      <div className="App">
        <WalletContent />
      </div>
    </LaserEyesProvider>
  )
}

export default App
