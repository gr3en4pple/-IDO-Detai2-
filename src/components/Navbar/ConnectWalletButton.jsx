import React from 'react'

import { useModal } from 'connectkit'
import { useAccount } from 'wagmi'
import { renderAddress } from '@/utils'
import { Button } from '@nextui-org/react'

const ConnectWalletButton = ({ color, useLoadingState = true, ...props }) => {
  const { setOpen, open, openSwitchNetworks } = useModal()
  const { address, isConnected, isConnecting, isDisconnected, chainId } =
    useAccount()

  const isWrongNetwork = chainId !== 97

  return (
    <Button
      color={color}
      isLoading={useLoadingState && isConnecting && open}
      onClick={() => (isWrongNetwork ? openSwitchNetworks() : setOpen(true))}
      {...props}
    >
      {isConnected
        ? isWrongNetwork
          ? 'Change Network'
          : address
          ? renderAddress(address)
          : ''
        : 'Connect Wallet'}
    </Button>
  )
}

export default ConnectWalletButton
