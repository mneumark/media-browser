'use client'

import { useEffect, useState } from 'react'
import { MediaPoster } from './MediaPoster'
import Link from 'next/link'

export function MediaPosterWithFetch({ item }: { item: MediaBase }) {
  const [media, setMedia] = useState<Media | null>(null)

  useEffect(() => {
    fetch(`/api/movie/${item.id}`)
      .then((res) => res.json())
      .then((data) => setMedia(data))
  }, [item.id])

  return (
    <Link href={`/detail/${media?.id || item.id}`}>
      <MediaPoster title={media?.title || item.title} imageUrl={media?.imageUrl} />
    </Link>
  )
}