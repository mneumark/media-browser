import { ChangeEvent } from 'react'
import Image from 'next/image'

export function FilterBox({
  filter,
  setFilter,
}: {
  filter: string
  setFilter: (filter: string) => void
}) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleClearInput = () => {
    setFilter('')
  }

  return (
    <div className="flex items-center justify-between p-4 text-white rounded-lg shadow-lg relative">
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        placeholder="Type to filter..."
        className="p-2 rounded-md bg-gray-700 text-white"
      />
      {filter &&
        <button
          onClick={handleClearInput}
          className='absolute right-7 top-1/2 transform -translate-y-1/2 text-white bg-none cursor-pointer'
        >
          <Image
            src="x.svg"
            width={15}
            height={15}
            alt="Clear filter"
          />
        </button>}
    </div>
  )
}