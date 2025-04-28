import media from '@/data/media'
import MediaPosterWithFetch from './MediaPoster/MediaPosterWithFetch'
export function MediaBrowser() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {media().map(item => (
        <MediaPosterWithFetch id={item.id} key={item.id} />
      ))}
    </div>
  )
}