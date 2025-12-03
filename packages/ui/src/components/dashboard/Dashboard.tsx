'use client'

import { useState, useEffect } from 'react'
import { useLaserEyes, useBalance, BTC } from '@omnisat/lasereyes'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { 
  Wallet, 
  Bitcoin, 
  Activity, 
  Copy, 
  LogOut, 
  Globe, 
  TrendingUp,
  Zap,
  Shield,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'

interface DashboardProps {
  className?: string
  onDisconnect?: () => void
}

export default function Dashboard({ className, onDisconnect }: DashboardProps) {
  const { 
    connected, 
    address, 
    disconnect, 
    network,
    publicKey,
    paymentAddress,
  } = useLaserEyes()

  const { data: btcBalance, isPending: isBtcBalancePending, error: btcBalanceError } = useBalance(BTC)

  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second for futuristic effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback for browsers that don't support clipboard API
        console.warn('Clipboard API not available')
      }
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`
  }

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect()
    } else {
      disconnect()
    }
  }

  if (!connected || !address) {
    return null
  }

  return (
    <div className={cn(
      "lem-w-full lem-max-w-4xl lem-mx-auto lem-p-4 lem-space-y-6",
      className
    )}>
      {/* Header Section */}
      <div className="lem-relative lem-overflow-hidden lem-rounded-2xl lem-bg-gradient-to-br lem-from-violet-600/20 lem-via-purple-600/20 lem-to-fuchsia-600/20 lem-border lem-border-violet-500/30 lem-p-6 lem-backdrop-blur-sm">
        {/* Animated background effect */}
        <div className="lem-absolute lem-inset-0 lem-bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_60%)]" />
        <div className="lem-absolute lem-top-0 lem-left-0 lem-w-full lem-h-full lem-opacity-30">
          <div className="lem-absolute lem-top-4 lem-left-4 lem-w-2 lem-h-2 lem-bg-cyan-400 lem-rounded-full lem-animate-pulse" />
          <div className="lem-absolute lem-top-8 lem-right-12 lem-w-1 lem-h-1 lem-bg-violet-400 lem-rounded-full lem-animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="lem-absolute lem-bottom-6 lem-left-1/4 lem-w-1.5 lem-h-1.5 lem-bg-fuchsia-400 lem-rounded-full lem-animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="lem-relative lem-flex lem-flex-col sm:lem-flex-row lem-items-start sm:lem-items-center lem-justify-between lem-gap-4">
          <div className="lem-flex lem-items-center lem-gap-4">
            <div className="lem-relative">
              <div className="lem-w-14 lem-h-14 lem-rounded-full lem-bg-gradient-to-br lem-from-cyan-400 lem-to-violet-600 lem-flex lem-items-center lem-justify-center lem-shadow-lg lem-shadow-violet-500/25">
                <Wallet className="lem-h-7 lem-w-7 lem-text-white" />
              </div>
              <div className="lem-absolute -lem-bottom-1 -lem-right-1 lem-w-4 lem-h-4 lem-bg-green-500 lem-rounded-full lem-border-2 lem-border-background lem-animate-pulse" />
            </div>
            <div>
              <h1 className="lem-text-2xl lem-font-bold lem-text-foreground lem-tracking-tight">
                Dashboard
              </h1>
              <p className="lem-text-sm lem-text-muted-foreground lem-font-mono">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </p>
            </div>
          </div>
          
          <div className="lem-flex lem-items-center lem-gap-2">
            <div className="lem-px-3 lem-py-1.5 lem-bg-cyan-500/20 lem-border lem-border-cyan-500/30 lem-rounded-full lem-flex lem-items-center lem-gap-2">
              <Globe className="lem-h-3.5 lem-w-3.5 lem-text-cyan-400" />
              <span className="lem-text-xs lem-font-medium lem-text-cyan-300 lem-uppercase lem-tracking-wider">
                {network || 'Mainnet'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="lem-text-red-400 hover:lem-text-red-300 hover:lem-bg-red-500/10"
            >
              <LogOut className="lem-h-4 lem-w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="lem-grid lem-grid-cols-1 sm:lem-grid-cols-2 lg:lem-grid-cols-3 lem-gap-4">
        {/* Balance Card */}
        <Card className="lem-relative lem-overflow-hidden lem-border-violet-500/20 lem-bg-gradient-to-br lem-from-background lem-to-violet-950/20">
          <div className="lem-absolute lem-top-0 lem-right-0 lem-w-32 lem-h-32 lem-bg-violet-500/10 lem-rounded-full lem-blur-3xl lem-translate-x-8 -lem-translate-y-8" />
          <CardHeader className="lem-pb-2">
            <CardTitle className="lem-flex lem-items-center lem-gap-2 lem-text-sm lem-font-medium lem-text-muted-foreground">
              <Bitcoin className="lem-h-4 lem-w-4 lem-text-orange-400" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lem-flex lem-items-baseline lem-gap-2">
              <span className={cn(
                "lem-text-3xl lem-font-bold lem-tracking-tight",
                btcBalanceError ? "lem-text-red-400" : "lem-text-foreground"
              )}>
                {btcBalanceError ? 'Error' : isBtcBalancePending ? '---' : (btcBalance != null ? String(btcBalance) : '0')}
              </span>
              <span className="lem-text-sm lem-text-orange-400 lem-font-medium">BTC</span>
            </div>
            <div className="lem-flex lem-items-center lem-gap-1 lem-mt-2">
              <TrendingUp className="lem-h-3 lem-w-3 lem-text-green-400" />
              <span className="lem-text-xs lem-text-green-400">Connected</span>
            </div>
          </CardContent>
        </Card>

        {/* Network Status Card */}
        <Card className="lem-relative lem-overflow-hidden lem-border-cyan-500/20 lem-bg-gradient-to-br lem-from-background lem-to-cyan-950/20">
          <div className="lem-absolute lem-top-0 lem-right-0 lem-w-32 lem-h-32 lem-bg-cyan-500/10 lem-rounded-full lem-blur-3xl lem-translate-x-8 -lem-translate-y-8" />
          <CardHeader className="lem-pb-2">
            <CardTitle className="lem-flex lem-items-center lem-gap-2 lem-text-sm lem-font-medium lem-text-muted-foreground">
              <Activity className="lem-h-4 lem-w-4 lem-text-cyan-400" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lem-flex lem-items-center lem-gap-3">
              <div className="lem-relative">
                <div className="lem-w-3 lem-h-3 lem-bg-green-500 lem-rounded-full" />
                <div className="lem-absolute lem-inset-0 lem-w-3 lem-h-3 lem-bg-green-500 lem-rounded-full lem-animate-ping lem-opacity-75" />
              </div>
              <span className="lem-text-lg lem-font-semibold lem-text-foreground">Online</span>
            </div>
            <p className="lem-text-xs lem-text-muted-foreground lem-mt-2 lem-capitalize">
              {network || 'Mainnet'} Network
            </p>
          </CardContent>
        </Card>

        {/* Security Status Card */}
        <Card className="lem-relative lem-overflow-hidden lem-border-emerald-500/20 lem-bg-gradient-to-br lem-from-background lem-to-emerald-950/20">
          <div className="lem-absolute lem-top-0 lem-right-0 lem-w-32 lem-h-32 lem-bg-emerald-500/10 lem-rounded-full lem-blur-3xl lem-translate-x-8 -lem-translate-y-8" />
          <CardHeader className="lem-pb-2">
            <CardTitle className="lem-flex lem-items-center lem-gap-2 lem-text-sm lem-font-medium lem-text-muted-foreground">
              <Shield className="lem-h-4 lem-w-4 lem-text-emerald-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lem-flex lem-items-center lem-gap-2">
              <Zap className="lem-h-5 lem-w-5 lem-text-emerald-400" />
              <span className="lem-text-lg lem-font-semibold lem-text-foreground">Secured</span>
            </div>
            <p className="lem-text-xs lem-text-muted-foreground lem-mt-2">
              Wallet verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Details Card */}
      <Card className="lem-relative lem-overflow-hidden lem-border-fuchsia-500/20">
        <div className="lem-absolute lem-inset-0 lem-bg-gradient-to-r lem-from-violet-500/5 lem-via-fuchsia-500/5 lem-to-cyan-500/5" />
        <CardHeader>
          <CardTitle className="lem-flex lem-items-center lem-gap-2 lem-text-lg">
            <Wallet className="lem-h-5 lem-w-5 lem-text-fuchsia-400" />
            Wallet Details
          </CardTitle>
        </CardHeader>
        <CardContent className="lem-space-y-4">
          {/* Address Section */}
          <div className="lem-p-4 lem-bg-background/50 lem-rounded-xl lem-border lem-border-border/50">
            <div className="lem-flex lem-flex-col sm:lem-flex-row lem-items-start sm:lem-items-center lem-justify-between lem-gap-3">
              <div>
                <p className="lem-text-xs lem-text-muted-foreground lem-uppercase lem-tracking-wider lem-mb-1">
                  Wallet Address
                </p>
                <p className="lem-font-mono lem-text-sm lem-text-foreground lem-break-all">
                  {formatAddress(address)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAddress}
                className="lem-shrink-0 lem-gap-2 lem-border-violet-500/30 hover:lem-bg-violet-500/10"
              >
                <Copy className="lem-h-3.5 lem-w-3.5" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Public Key Section */}
          {publicKey && (
            <div className="lem-p-4 lem-bg-background/50 lem-rounded-xl lem-border lem-border-border/50">
              <p className="lem-text-xs lem-text-muted-foreground lem-uppercase lem-tracking-wider lem-mb-1">
                Public Key
              </p>
              <p className="lem-font-mono lem-text-xs lem-text-muted-foreground lem-break-all">
                {`${publicKey.slice(0, 16)}...${publicKey.slice(-16)}`}
              </p>
            </div>
          )}

          {/* Payment Address Section */}
          {paymentAddress && paymentAddress !== address && (
            <div className="lem-p-4 lem-bg-background/50 lem-rounded-xl lem-border lem-border-border/50">
              <p className="lem-text-xs lem-text-muted-foreground lem-uppercase lem-tracking-wider lem-mb-1">
                Payment Address
              </p>
              <p className="lem-font-mono lem-text-sm lem-text-foreground lem-break-all">
                {formatAddress(paymentAddress)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="lem-border-violet-500/20">
        <CardHeader>
          <CardTitle className="lem-text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lem-grid lem-grid-cols-2 lem-gap-3">
            <Button
              variant="outline"
              className="lem-h-auto lem-py-4 lem-flex lem-flex-col lem-items-center lem-gap-2 lem-border-cyan-500/30 hover:lem-bg-cyan-500/10 hover:lem-border-cyan-500/50"
            >
              <ArrowUpRight className="lem-h-5 lem-w-5 lem-text-cyan-400" />
              <span className="lem-text-sm">Send</span>
            </Button>
            <Button
              variant="outline"
              className="lem-h-auto lem-py-4 lem-flex lem-flex-col lem-items-center lem-gap-2 lem-border-violet-500/30 hover:lem-bg-violet-500/10 hover:lem-border-violet-500/50"
            >
              <ArrowDownLeft className="lem-h-5 lem-w-5 lem-text-violet-400" />
              <span className="lem-text-sm">Receive</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
