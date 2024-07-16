import Community from '@/assets/Community'
import classNames from '@/utils/classnames'
import { Chip, Image } from '@nextui-org/react'
import React from 'react'

const IdoImage = ({ isPrivate, isSoldout, className }) => {
  return (
    <div className="relative">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        alt={'stark'}
        className={classNames('w-full object-fit', className)}
        src={
          'https://cdn.coin68.com/images/20231206103714-2b8f1075-2f34-4800-afc0-0da6733b1f9b-128.jpg'
        }
      />
      {isSoldout && (
        <div className="absolute left-0 z-10 -translate-y-1/2 top-1/2">
          <Image
            src="https://winery.finance/images/soldout1.png"
            alt="soldout"
          />
        </div>
      )}
      <div className="absolute z-10 right-4 bottom-4">
        <Chip
          startContent={<Community size={16} />}
          color={isPrivate ? 'secondary' : 'primary'}
          variant="shadow"
        >
          {isPrivate ? 'Private' : 'Public'}
        </Chip>
      </div>
    </div>
  )
}

export default IdoImage
