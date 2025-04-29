'use client'

import { Suspense, use, useEffect, useState } from 'react'
import { MediaPoster } from './MediaPoster'
import { getMovieData } from '@/lib/api'
import Link from 'next/link'

export function MediaPosterWithFetch({ id }: { id: number }) {
  const [media, setMedia] = useState<Media | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieData(id)
      setMedia(data)
    }
    fetchData()
  }, [id])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {media && (
        <Link href={`/detail/${media.id}`}>
          <MediaPoster media={media} />
        </Link>
  )}
    </Suspense>
  )
}