import React from 'react'
import { Link, useParams } from 'react-router-dom'
import MainCard from './components/MainCard'
import IdoInformation from './components/IdoInformation'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

const Ido = () => {
  const params = useParams()

  return (
    <div className="px-4 mx-auto mt-10 max-w-7xl mb-[120px] ">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link to="/" className="text-lg">
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <div className="font-semibold uppercase text-lg">
            {params.id} - IDO
          </div>
        </BreadcrumbItem>
      </Breadcrumbs>

      <MainCard />
      <IdoInformation />
    </div>
  )
}

export default Ido
