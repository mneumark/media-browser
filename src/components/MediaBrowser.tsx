'use client'

import { SortMenu, SortOption } from '@/components/SortMenu'
import rawMedia from '@/data/media'
import { ReactNode, useState } from 'react'
import { MediaPosterWithFetch } from './MediaPoster/MediaPosterWithFetch'
type MediaWithData = {
  media: MediaBase
  mediaPoster: ReactNode
}

const SORT_FIELD: Record<SortOption, {field: keyof MediaBase, direction: 1 | -1}> = {
  [SortOption.NAME_ASC]: { field: 'title', direction: 1 },
  [SortOption.NAME_DESC]: { field: 'title', direction: -1 },
  [SortOption.DATE_ASC]: { field: 'date', direction: 1 },
  [SortOption.DATE_DESC]: { field: 'date', direction: -1 },
}

export function MediaBrowser() {
  const media = rawMedia().map(item => ({
    mediaPoster: <MediaPosterWithFetch id={item.id} key={item.id} />,
    media: item,
  }))

  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NAME_ASC)
  const { field, direction } = SORT_FIELD[sortBy || SortOption.NAME_ASC]
  const sortedMedia = media.sort((a, b) => {
    
    if (a.media[field] < b.media[field]) {
      return -1 * direction
    }
    if (a.media[field] > b.media[field]) {
      return 1 * direction
    }
  
    return 0
    
  }).map((item) => item.mediaPoster)

  return (
    <div>
      <div className="flex justify-end w-full">
          <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {sortedMedia}
      </div>
    </div>
  )
}