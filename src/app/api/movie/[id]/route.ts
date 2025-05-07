import { NextResponse } from "next/server"

const TMDB_API_URL = process.env.TMDB_API_URL
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN
const TMDB_POSTER_PATH_URL = process.env.TMDB_POSTER_PATH_URL
const POSTER_WIDTH = 200

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const url = `${TMDB_API_URL}/3/movie/${id}`

  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  })

  const json = await data.json()

  const media = {
    id: json.id,
    title: json.title,
    imageUrl: `${TMDB_POSTER_PATH_URL}/w${POSTER_WIDTH}${json.poster_path}`,
    description: json.overview,
    releaseDate: json.release_date,
    ageRating: json.adult ? 18 : 0,
    rating: json.vote_average,
    genres: json.genre_ids,
    duration: json.runtime,
  }

  return NextResponse.json(media)
}