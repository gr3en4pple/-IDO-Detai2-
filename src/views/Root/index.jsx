import Navbar from '@/components/Navbar'
import React from 'react'

const Root = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="px-4 mx-auto mt-20 max-w-7xl ">{children}</div>
    </div>
  )
}

export default Root
