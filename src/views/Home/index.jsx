import React from 'react'
import { useIdoContractInfo } from '@/hooks/useIdo'
import IdoCard from './components/IdoCard'

const Home = () => {
  const { data: idoInfo, isLoading } = useIdoContractInfo()
  return (
    <div className="px-4 mx-auto mt-20 max-w-7xl ">
      <h1 className="text-4xl font-semibold text-center  mb-6">
        IDO (Decentralized Crowdfunding)
      </h1>
      <div className="flex -m-3">
        <div className="w-1/3 p-3">
          <IdoCard idoInfo={idoInfo} isLoading={isLoading} />
        </div>
        {/* <div className="w-1/3 p-3">
          <IdoCard />
        </div>
        <div className="w-1/3 p-3">
          <IdoCard />
        </div> */}
      </div>
    </div>
  )
}

export default Home
