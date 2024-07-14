import React from 'react'
import { useParams } from 'react-router-dom'
import MainCard from './components/MainCard'
import IdoInformation from './components/IdoInformation'
import { Toaster } from 'sonner'

const Ido = () => {
  const params = useParams()

  return (
    <div className="px-4 mx-auto mt-20 max-w-7xl mb-[120px] ">
      <Toaster richColors />
      <MainCard />
      <IdoInformation /> 
    </div>
  )
}

export default Ido
