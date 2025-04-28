'use client'

import MediaDetail from '@/components/MediaDetail'
import { getMovieData } from '@/lib/api'
import { Suspense, use, useEffect, useState } from 'react'

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [media, setMedia] = useState<Media | null>(null)
  useEffect(() => {
    async function fetchData() {
      const data = await getMovieData(Number(id))
      setMedia(data)
    }
    fetchData()
  }, [id])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {media && <MediaDetail media={media} />}
    </Suspense>
  )
}