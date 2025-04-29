import { SORT_FIELD, SortOption } from "@/components/SortMenu"

const media = [
  { title: 'A Bug\'s Life', id: 9487, date: '1998-11-20' },
  { title: 'The Adventures of Ichabod and Mr. Toad', id: 13465, date: '1949-10-05' },
  { title: 'Aladdin', id: 812, date: '1992-11-25' },
  { title: 'Alice in Wonderland', id: 12092, date: '1951-07-28' },
  { title: 'The Aristocats', id: 10112, date: '1970-12-24' },
  { title: 'Bambi', id: 3170, date: '1942-08-21' },
  { title: 'Beauty and the Beast', id: 10020, date: '1991-11-13' },
  { title: 'Brave', id: 62177, date: '2012-06-22' },
  { title: 'Cars', id: 920, date: '2006-06-09' },
  { title: 'Cars 2', id: 49013, date: '2011-06-24' },
  { title: 'Cinderella', id: 11224, date: '1950-03-04' },
  { title: 'Dumbo', id: 11360, date: '1941-10-23' },
  { title: 'The Emperor\'s New Groove', id: 11688, date: '2000-12-15' },
  { title: 'Fantasia', id: 756, date: '1940-11-13' },
  { title: 'Finding Nemo', id: 12, date: '2003-05-30' },
  { title: 'The Fox and the Hound', id: 10948, date: '1981-07-10' },
  { title: 'The Great Mouse Detective', id: 9994, date: '1986-07-02' },
  { title: 'The Hunchback of Notre Dame', id: 10545, date: '1996-06-21' },
  { title: 'The Incredibles', id: 9806, date: '2004-11-05' },
  { title: 'The Jungle Book', id: 9325, date: '1967-10-18' },
  { title: 'Lady and the Tramp', id: 10340, date: '1955-06-22' },
  { title: 'The Lion King', id: 8587, date: '1994-06-24' },
  { title: 'The Little Mermaid', id: 10144, date: '1989-11-17' },
  { title: 'The Many Adventures of Winnie the Pooh', id: 250480, date: '1977-03-11' },
  { title: 'Monsters University', id: 62211, date: '2013-06-21' },
  { title: 'Monsters, Inc.', id: 585, date: '2001-11-02' },
  { title: 'Peter Pan', id: 10693, date: '1953-02-05' },
  { title: 'Pinocchio', id: 10895, date: '1940-02-07' },
  { title: 'The Princess and the Frog', id: 10198, date: '2009-12-11' },
  { title: 'Ratatouille', id: 2062, date: '2007-06-29' },
  { title: 'The Reluctant Dragon', id: 22752, date: '1941-06-20' },
  { title: 'The Rescuers', id: 11319, date: '1977-06-22' },
  { title: 'The Rescuers Down Under', id: 11135, date: '1990-11-16' },
  { title: 'Sleeping Beauty', id: 10882, date: '1959-01-29' },
  { title: 'Snow White and the Seven Dwarfs', id: 408, date: '1937-12-21' },
  { title: 'The Sword in the Stone', id: 9078, date: '1963-12-25' },
  { title: 'The Three Caballeros', id: 15947, date: '1944-12-21' },
  { title: 'Toy Story', id: 862, date: '1995-11-22' },
  { title: 'Toy Story 2', id: 863, date: '1999-11-19' },
  { title: 'Toy Story 3', id: 10193, date: '2010-06-18' },
  { title: 'Up', id: 14160, date: '2009-05-29' },
  { title: 'WALL-E', id: 10681, date: '2008-06-27' }
  // { title: 'A Bug\'s Life', id: 9487, date: '1998-11-20' },
  // { title: 'Brave', id: 62177, date: '2012-06-22' },
  // { title: 'Cars', id: 920, date: '2006-06-09' },
  // { title: 'Cars 2', id: 49013, date: '2011-06-24' },
  // { title: 'Finding Nemo', id: 12, date: '2003-05-30' },
  // { title: 'Monsters University', id: 62211, date: '2013-06-21' },
  // { title: 'Monsters, Inc.', id: 585, date: '2001-11-02' },
  // { title: 'Ratatouille', id: 2062, date: '2007-06-29' },
  // { title: 'The Incredibles', id: 9806, date: '2004-11-05' },
  // { title: 'Toy Story', id: 862, date: '1995-11-22' },
  // { title: 'Toy Story 2', id: 863, date: '1999-11-19' },
  // { title: 'Toy Story 3', id: 10193, date: '2010-06-18' },
  // { title: 'Up', id: 14160, date: '2009-05-29' },
  // { title: 'WALL-E', id: 10681, date: '2008-06-27' }
  ]

function sortMedia(media: MediaBase[], field: keyof Pick<MediaBase, 'date' | 'title'>, direction: 'asc' | 'desc') {
  return media.sort((a, b) => {
    const aValue = field ==='title' ? a[field].replace(/^(?:The|A)\s+/i, '').toLowerCase() : a[field]
    const bValue = field ==='title' ? b[field].replace(/^(?:The|A)\s+/i, '').toLowerCase() : b[field]
    if (direction === 'asc') {
      return aValue.localeCompare(bValue)
    }
    return bValue.localeCompare(aValue)
  })
}

export default function({
  filter, 
  start, 
  end,
  sortField,
  sortDirection,
}: {
  filter: string, 
  start: number, 
  end: number,
  sortField: keyof Pick<MediaBase, 'date' | 'title'>,
  sortDirection: 'asc' | 'desc'
}): MediaBase[] {
  const filtered = media.filter(item => item.title.toLowerCase().includes((filter || '').toLowerCase()))

  return sortMedia(filtered, sortField, sortDirection).slice(start, end)
}

export function mediaCount(filter: string = '') {
  return media.filter(item => item.title.toLowerCase().includes((filter || '').toLowerCase())).length
}