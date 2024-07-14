import React from 'react'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Image
} from '@nextui-org/react'
import ConnectWalletButton from './ConnectWalletButton'

const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <a className="flex items-center justify-start gap-1" href="/">
            <Image
              alt="navbar_logo"
              width={48}
              height={48}
              src="https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-6278326_1280.png"
            />
            <p className="font-bold text-inherit">IDO</p>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <ConnectWalletButton color="primary" />
    </NextUINavbar>
  )
}

export default Navbar
