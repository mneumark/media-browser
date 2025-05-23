type MediaBase = {
  id: number
  title: string
  date: string
}

type Media = MediaBase & {
  imageUrl: string
  description: string
  releaseDate: string
  ageRating: number
  rating: number
  genres: string[]
  duration: number
}