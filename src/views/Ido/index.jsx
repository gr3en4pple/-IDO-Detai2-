import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainCard from './components/MainCard'
import IdoInformation from './components/IdoInformation'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { IDO_LIST } from '@/config/idos'

const Ido = () => {
  const params = useParams()

  const id = params?.id
  const existIdo = useMemo(() => IDO_LIST.find((ido) => ido.name === id), [id])

  if (!existIdo) return null

  return (
    <div className="px-4 mx-auto mt-10 max-w-7xl mb-[120px] ">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link to="/" className="text-lg">
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <div className="font-semibold uppercase text-lg">{params.id}</div>
        </BreadcrumbItem>
      </Breadcrumbs>

      <MainCard {...existIdo} />
      <IdoInformation {...existIdo} />
    </div>
  )
}

export default Ido
