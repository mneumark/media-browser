'use client'

import { MediaPoster } from "./MediaPoster/MediaPoster"

export default function MediaDetail({ media }: { media: Media }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Media Detail</h1>
      {media && <MediaPoster media={media} />}
    </div>
  )
}