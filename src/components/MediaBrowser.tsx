'use client'

import { SortMenu, SortOption, SORT_FIELD } from '@/components/SortMenu'
import rawMedia, { mediaCount } from '@/data/media'
import { ReactNode, useEffect, useState } from 'react'
import { MediaPosterWithFetch } from './MediaPoster/MediaPosterLink'
import { FilterBox } from './FilterBox'
import useInfiniteScroll from 'react-infinite-scroll-hook'

type MediaWithData = {
  media: MediaBase
  mediaPoster: ReactNode
}

const PAGE_SIZE = 10

export function MediaBrowser() {
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NAME_ASC)
  const [filter, setFilter] = useState<string>('')
  const [start, setStart] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [media, setMedia] = useState<MediaBase[]>([])

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: mediaCount(filter) > media.length,
    onLoadMore: getMoreMedia,
    disabled: false,
  })

  function reset() {
    setMedia([])
    setStart(0)
    setLoading(false)
  }

  function sort(sortOpt: SortOption) {
    setSortBy(sortOpt)
    reset()
  }

  function filterMedia(filter: string) {
    setFilter(filter)
    reset()
  }

  function getMoreMedia(sortOpt?: SortOption) {
    setLoading(true)
    const { field, direction } = SORT_FIELD[sortOpt || sortBy]
    const newMedia = rawMedia({
      filter, 
      start, 
      end: start + PAGE_SIZE,
      sortField: field,
      sortDirection: direction,
    })
    setMedia((prev) => [...prev, ...newMedia])
    setStart(start + PAGE_SIZE)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const { field, direction } = SORT_FIELD[sortBy || SortOption.NAME_ASC]

  return (
    <div>
      <div className="flex justify-between mx-4 mt-4 items-center">
          <FilterBox setFilter={filterMedia} filter={filter} />
          <SortMenu sortBy={sortBy} setSortBy={sort} />
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4"
      >
        {media.map(item => item?.id && <MediaPosterWithFetch id={item.id} key={item.id} />)}
      </div>
      {mediaCount(filter) > media.length && (
        <div ref={infiniteRef} className="col-span-full flex justify-center items-center">
          Loading...
        </div>
      )}
    </div>
  )
}