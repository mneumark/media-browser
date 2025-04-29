import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const TMDB_POSTER_PATH_URL = process.env.TMDB_POSTER_PATH_URL
const POSTER_WIDTH = 200
const POSTER_HEIGHT = 300

export function MediaPoster({
  media,
  hideTitle = false,
}: {
  media: Media
  hideTitle?: boolean
}) {

  const { title, imageUrl } = media

  return (
    <div className="flex flex-col items-center justify-center p-4 text-white shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        width={POSTER_WIDTH}
        height={POSTER_HEIGHT}
      />
      {!hideTitle && <h2 className="text-xl font-bold mb-2 h-15 overflow-ellipsis flex text-center">{title}</h2>}
    </div>
  )
}