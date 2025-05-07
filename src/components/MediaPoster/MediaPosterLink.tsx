'use client'

import { useEffect, useState } from 'react'
import { MediaPoster } from './MediaPoster'
import { getMovieData } from '@/lib/api'
import Link from 'next/link'

export function MediaPosterWithFetch({ item }: { item: MediaBase }) {
  const [media, setMedia] = useState<Media | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieData(id)
      setMedia(data)
    }
    fetchData()
  }, [id])

  return (
    <Link href={`/detail/${media?.id || item.id}`}>
      <MediaPoster title={media?.title || item.title} imageUrl={media?.imageUrl} />
    </Link>
  )
}