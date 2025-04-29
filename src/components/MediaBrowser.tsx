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
  const [media, setMedia] = useState<MediaWithData[]>([])

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: mediaCount() > media.length,
    onLoadMore: getMoreMedia,
    disabled: false,
  })

  function getMoreMedia() {
    setLoading(true)
    const newMedia = rawMedia(filter, start, start + PAGE_SIZE).map(item => ({
      mediaPoster: <MediaPosterWithFetch id={item.id} key={item.id} />,
      media: item,
    }))
    setMedia((prev) => [...prev, ...newMedia])
    setStart(start + PAGE_SIZE)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  
  useEffect(() => {
    if (!media) getMoreMedia()
  }, [])

  const { field, direction } = SORT_FIELD[sortBy || SortOption.NAME_ASC]
  const sortedMedia = media.sort((a, b) => {
    const aValue = field ==='title' ? a.media[field].replace(/^(?:The|A)\s+/i, '').toLowerCase() : a.media[field]
    const bValue = field ==='title' ? b.media[field].replace(/^(?:The|A)\s+/i, '').toLowerCase() : b.media[field]
    if (direction === 'asc') {
      return aValue.localeCompare(bValue)
    }
    return bValue.localeCompare(aValue)
  }).map((item) => item.mediaPoster)

  return (
    <div>
      <div className="flex justify-between mx-4 mt-4 items-center">
          <FilterBox setFilter={setFilter} filter={filter} />
          <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4"> */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4"
      >
        {sortedMedia}
      </div>
      {mediaCount() > media.length && (
        <div ref={infiniteRef} className="col-span-full flex justify-center items-center">
          Loading...
        </div>
      )}

      {/* </div> */}
    </div>
  )
}