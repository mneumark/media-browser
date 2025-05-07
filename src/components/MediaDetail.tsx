'use client'

import { MediaPoster } from './MediaPoster/MediaPoster'
import Image from 'next/image'

export default function MediaDetail({ media }: { media: Media }) {
  if (!media) {
    return <div>Loading...</div>
  }

  const releaseDate = new Date(media.releaseDate)
  const formattedDate = releaseDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col items-center justify-center p-4 text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Media Detail</h1>
      <div className="flex direction-row">
        <MediaPoster imageUrl={media.imageUrl} />
        <div>
          <h2 className="text-xl font-bold mt-4">{media.title}</h2>
          <p className="flex direction-row mb-2">
            {
              Array.from(Array(Math.round(media.rating))).map((x, i) => {
                return (
                  <Image
                  src="/rating-star.svg"
                  key={i}
                  width={15}
                  height={15}
                  alt="Star"
                  />
                )
              })
            }
            {
              Array.from(Array(10 - Math.round(media.rating))).map((x, i) => {
                return (
                  <Image
                  src="/white-rating-star.svg"
                  key={i}
                  width={15}
                  height={15}
                  alt="Star"
                  />
                )
              })
            }
          </p>
          <p className="text-gray-400 mb-2">{media.duration} minutes</p>
          <p className="text-gray-400 mb-10">{formattedDate}</p>
          <p className="text-gray-400">{media.description}</p>
        </div>
      </div>
    </div>
  )
}