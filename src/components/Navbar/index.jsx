import React from 'react'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  Button
} from '@nextui-org/react'

import { useModal } from 'connectkit'
import { useAccount } from 'wagmi'
import { renderAddress } from '@/utils'
const Navbar = () => {
  const { setOpen, open } = useModal()
  const { address, isConnected, isConnecting } = useAccount()

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <a className="flex items-center justify-start gap-1" href="/">
            <p className="font-bold text-inherit">IDO</p>
          </a>
        </NavbarBrand>
        <ul className="justify-start hidden gap-4 ml-2 lg:flex"></ul>
      </NavbarContent>
      <Button isLoading={open} onClick={() => setOpen(true)}>
        {isConnected
          ? address
            ? renderAddress(address)
            : ''
          : 'Connect Wallet'}
      </Button>
    </NextUINavbar>
  )
}

export default Navbar
