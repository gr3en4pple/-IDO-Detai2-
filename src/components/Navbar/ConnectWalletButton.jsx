import React from 'react'

import { useModal } from 'connectkit'
import { useAccount } from 'wagmi'
import { renderAddress } from '@/utils'
import { Button } from '@nextui-org/react'

const ConnectWalletButton = ({ color, useLoadingState = true, ...props }) => {
  const { setOpen, open } = useModal()
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  return (
    <Button
      color={color}
      isLoading={useLoadingState && isConnecting && open}
      onClick={() => setOpen(true)}
      {...props}
    >
      {isConnected ? (address ? renderAddress(address) : '') : 'Connect Wallet'}
    </Button>
  )
}

export default ConnectWalletButton
