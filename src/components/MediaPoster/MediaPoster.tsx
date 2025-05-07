import Image from 'next/image'

const POSTER_WIDTH = 200
const POSTER_HEIGHT = 300

export function MediaPoster({
  title,
  imageUrl,
}: {
  title?: string;
  imageUrl?: string;
}) {  
  return (
    <div className="flex flex-col items-center justify-center p-4 text-white shadow-lg">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title || ''}
          width={POSTER_WIDTH}
          height={POSTER_HEIGHT}
        />
      ) : (
        <div className={`bg-neutral-800 flex items-center justify-center text-center w-[${POSTER_WIDTH}px] h-[${POSTER_HEIGHT}px] text-neutral-500 text-base`}>
          {title}
        </div>
      )}
      {title && <h2 className="text-xl font-bold mb-2 h-15 overflow-ellipsis flex text-center">{title}</h2>}
    </div>
  )
}