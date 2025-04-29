'use server'

const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN
const TMDB_API_URL = process.env.TMDB_API_URL
const TMDB_POSTER_PATH_URL = process.env.TMDB_POSTER_PATH_URL
const POSTER_WIDTH = 200
const POSTER_HEIGHT = 300

export async function getMovieData(id: number): Promise<Media> {
  const url = `${TMDB_API_URL}/3/movie/${id}`
  const data = fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  }).then((res) => res.json())
    .then ((data) => ({
      id: data.id,
      title: data.title,
      imageUrl: `${TMDB_POSTER_PATH_URL}/w${POSTER_WIDTH}${data.poster_path}`,
      description: data.overview,
      releaseDate: data.release_date,
      ageRating: data.adult ? 18 : 0,
      rating: data.vote_average,
      genres: data.genre_ids,
      duration: data.runtime,
  } as Media))

  return data
}

