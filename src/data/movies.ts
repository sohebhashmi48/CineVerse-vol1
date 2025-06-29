import { Movie } from '../types/movie';

export const movies: Movie[] = [
  {
    id: 1,
    title: "Squid Game",
    year: 2021,
    genre: ["Action", "Drama", "Mystery"],
    rating: 8.0,
    duration: "60m per episode",
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, but the stakes are deadly. A mysterious organization lures desperate people into a survival game with a massive cash prize.",
    poster: "https://ntvb.tmsimg.com/assets/p20492187_b_h8_aa.jpg?w=1280&h=720",
    backdrop: "https://ntvb.tmsimg.com/assets/p20492187_b_h8_aa.jpg?w=1280&h=720",
    director: "Hwang Dong-hyuk",
    cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon", "HoYeon Jung"],
    featured: true
  },
  {
    id: 2,
    title: "Dune",
    year: 2021,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.0,
    duration: "2h 35m",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    poster: "https://assets-prd.ignimgs.com/2021/08/09/dune-button-2021-1628542173776.jpg",
    backdrop: "https://assets-prd.ignimgs.com/2021/08/09/dune-button-2021-1628542173776.jpg",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Josh Brolin"]
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: ["Animation", "Action", "Adventure"],
    rating: 8.7,
    duration: "2h 20m",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster: "https://thriftyminnesota.com/wp-content/uploads/2023/05/Spider-Man-Across-The-Spider-Verse-Poster.jpeg",
    backdrop: "https://thriftyminnesota.com/wp-content/uploads/2023/05/Spider-Man-Across-The-Spider-Verse-Poster.jpeg",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Vélez"]
  },
  {
    id: 4,
    title: "House of the Dragon",
    year: 2024,
    genre: ["Fantasy", "Drama", "Action"],
    rating: 8.5,
    duration: "60m per episode",
    description: "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.",
    poster: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/house-of-the-dragon-poster.jpg",
    backdrop: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/house-of-the-dragon-poster.jpg",
    director: "Ryan Condal",
    cast: ["Paddy Considine", "Matt Smith", "Rhys Ifans", "Emma D'Arcy"]
  },
  {
    id: 5,
    title: "Wednesday",
    year: 2022,
    genre: ["Comedy", "Horror", "Mystery"],
    rating: 8.1,
    duration: "50m per episode",
    description: "Follows Wednesday Addams' years as a student at Nevermore Academy, where she attempts to master her emerging psychic ability, thwart a monstrous killing spree that has terrorized the local town, and solve the murder mystery that embroiled her parents.",
    poster: "https://lakewoodsnn.com/wp-content/uploads/2023/02/wednesday-720x900.jpg",
    backdrop: "https://lakewoodsnn.com/wp-content/uploads/2023/02/wednesday-720x900.jpg",
    director: "Tim Burton",
    cast: ["Jenna Ortega", "Hunter Doohan", "Percy Hynes White", "Emma Myers"]
  },
  {
    id: 6,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    genre: ["Action", "Adventure", "Drama"],
    rating: 6.7,
    duration: "2h 41m",
    description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
    poster: "https://image.tmdb.org/t/p/original/qT1JPO6IltC2B39QAriAg7SelMx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/qT1JPO6IltC2B39QAriAg7SelMx.jpg",
    director: "Ryan Coogler",
    cast: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira", "Winston Duke"]
  }
];

export const featuredMovie = movies.find(movie => movie.featured) || movies[0];

export const genreCategories = [
  {
    id: 'trending',
    name: 'Trending Now',
    movies: movies.slice(0, 6)
  },
  {
    id: 'movies',
    name: 'Latest Movies',
    movies: movies.filter(movie => !movie.duration.includes('episode')).slice(0, 4)
  },
  {
    id: 'series',
    name: 'Popular Series',
    movies: movies.filter(movie => movie.duration.includes('episode')).slice(0, 4)
  },
  {
    id: 'action',
    name: 'Action & Adventure',
    movies: movies.filter(movie => 
      movie.genre.includes('Action') || movie.genre.includes('Adventure')
    ).slice(0, 4)
  },
  {
    id: 'fantasy',
    name: 'Fantasy & Sci-Fi',
    movies: movies.filter(movie => 
      movie.genre.includes('Sci-Fi') || 
      movie.genre.includes('Fantasy') || 
      movie.genre.includes('Animation')
    ).slice(0, 4)
  }
];