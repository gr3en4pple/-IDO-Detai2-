import React from 'react'
import IdoCard from './components/IdoCard'
import { IDO_LIST } from '@/config/idos'

const Home = () => {
  return (
    <div className="px-4 mx-auto mt-20 max-w-7xl ">
      <h1 className="text-4xl font-semibold text-center  mb-6">
        IDO (Decentralized Crowdfunding)
      </h1>
      <div className="flex -m-3">
        {IDO_LIST.map((ido) => (
          <div key={ido.contract_address} className="w-1/3 p-3">
            <IdoCard {...ido} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
