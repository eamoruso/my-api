const express = require('express');
const router = express.Router();

const movies = [
  { id: 1, title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', genre: ['Drama'], rating: 9.3, duration: 142, cast: ['Tim Robbins', 'Morgan Freeman'], synopsis: 'Two imprisoned men bond over a number of years.', streamingPlatform: 'Netflix', boxOffice: 58300000, releaseDate: '1994-09-23', imdbRating: 9.3, rottenTomatoes: 91 },
  { id: 2, title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: ['Crime', 'Drama'], rating: 9.2, duration: 175, cast: ['Marlon Brando', 'Al Pacino'], synopsis: 'The aging patriarch of an organized crime dynasty.', streamingPlatform: 'Paramount+', boxOffice: 250000000, releaseDate: '1972-03-15', imdbRating: 9.2, rottenTomatoes: 97 },
  { id: 3, title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: ['Action', 'Crime', 'Drama'], rating: 9.0, duration: 152, cast: ['Christian Bale', 'Heath Ledger'], synopsis: 'Batman faces the Joker, a criminal mastermind.', streamingPlatform: 'HBO Max', boxOffice: 1006000000, releaseDate: '2008-07-18', imdbRating: 9.0, rottenTomatoes: 94 },
  { id: 4, title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', genre: ['Crime', 'Drama'], rating: 8.9, duration: 154, cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'], synopsis: 'Interconnected tales of crime in Los Angeles.', streamingPlatform: 'Amazon Prime', boxOffice: 214000000, releaseDate: '1994-10-14', imdbRating: 8.9, rottenTomatoes: 92 },
  { id: 5, title: 'Inception', year: 2010, director: 'Christopher Nolan', genre: ['Action', 'Sci-Fi', 'Thriller'], rating: 8.8, duration: 148, cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], synopsis: 'A thief who steals corporate secrets through dream-sharing technology.', streamingPlatform: 'Netflix', boxOffice: 837000000, releaseDate: '2010-07-16', imdbRating: 8.8, rottenTomatoes: 87 },
  { id: 6, title: 'Forrest Gump', year: 1994, director: 'Robert Zemeckis', genre: ['Drama', 'Romance'], rating: 8.8, duration: 142, cast: ['Tom Hanks', 'Robin Wright'], synopsis: 'The life journey of a man with low IQ.', streamingPlatform: 'Paramount+', boxOffice: 678000000, releaseDate: '1994-07-06', imdbRating: 8.8, rottenTomatoes: 72 },
  { id: 7, title: 'The Matrix', year: 1999, director: 'The Wachowskis', genre: ['Action', 'Sci-Fi'], rating: 8.7, duration: 136, cast: ['Keanu Reeves', 'Laurence Fishburne'], synopsis: 'A computer programmer discovers reality is a simulation.', streamingPlatform: 'HBO Max', boxOffice: 467000000, releaseDate: '1999-03-31', imdbRating: 8.7, rottenTomatoes: 88 },
  { id: 8, title: 'Interstellar', year: 2014, director: 'Christopher Nolan', genre: ['Adventure', 'Drama', 'Sci-Fi'], rating: 8.6, duration: 169, cast: ['Matthew McConaughey', 'Anne Hathaway'], synopsis: 'A team of explorers travel through a wormhole in space.', streamingPlatform: 'Paramount+', boxOffice: 677000000, releaseDate: '2014-11-07', imdbRating: 8.6, rottenTomatoes: 73 },
  { id: 9, title: 'Spirited Away', year: 2001, director: 'Hayao Miyazaki', genre: ['Animation', 'Adventure', 'Family'], rating: 8.6, duration: 125, cast: ['Rumi Hiiragi', 'Miyu Irino'], synopsis: 'A young girl becomes trapped in a mysterious spirit world.', streamingPlatform: 'HBO Max', boxOffice: 395000000, releaseDate: '2001-07-20', imdbRating: 8.6, rottenTomatoes: 97 },
  { id: 10, title: 'Parasite', year: 2019, director: 'Bong Joon-ho', genre: ['Comedy', 'Drama', 'Thriller'], rating: 8.5, duration: 132, cast: ['Song Kang-ho', 'Lee Sun-kyun'], synopsis: 'A poor family schemes to become employed by a wealthy family.', streamingPlatform: 'Hulu', boxOffice: 263000000, releaseDate: '2019-10-11', imdbRating: 8.5, rottenTomatoes: 99 },
  { id: 11, title: 'The Avengers', year: 2012, director: 'Joss Whedon', genre: ['Action', 'Sci-Fi'], rating: 8.0, duration: 143, cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'], synopsis: 'Earth\'s mightiest heroes unite against an alien invasion.', streamingPlatform: 'Disney+', boxOffice: 1519000000, releaseDate: '2012-05-04', imdbRating: 8.0, rottenTomatoes: 91 },
  { id: 12, title: 'Toy Story', year: 1995, director: 'John Lasseter', genre: ['Animation', 'Adventure', 'Comedy'], rating: 8.3, duration: 81, cast: ['Tom Hanks', 'Tim Allen'], synopsis: 'A cowboy doll feels threatened when a new spaceman arrives.', streamingPlatform: 'Disney+', boxOffice: 373000000, releaseDate: '1995-11-22', imdbRating: 8.3, rottenTomatoes: 100 },
  { id: 13, title: 'Get Out', year: 2017, director: 'Jordan Peele', genre: ['Horror', 'Mystery', 'Thriller'], rating: 7.7, duration: 104, cast: ['Daniel Kaluuya', 'Allison Williams'], synopsis: 'A young man uncovers disturbing secrets during a visit.', streamingPlatform: 'Amazon Prime', boxOffice: 255000000, releaseDate: '2017-02-24', imdbRating: 7.7, rottenTomatoes: 98 },
  { id: 14, title: 'Dune', year: 2021, director: 'Denis Villeneuve', genre: ['Adventure', 'Drama', 'Sci-Fi'], rating: 8.0, duration: 155, cast: ['Timothée Chalamet', 'Rebecca Ferguson'], synopsis: 'A noble family becomes embroiled in a war for control over a desert planet.', streamingPlatform: 'HBO Max', boxOffice: 434000000, releaseDate: '2021-10-22', imdbRating: 8.0, rottenTomatoes: 83 },
  { id: 15, title: 'The Social Network', year: 2010, director: 'David Fincher', genre: ['Biography', 'Drama'], rating: 7.8, duration: 120, cast: ['Jesse Eisenberg', 'Andrew Garfield'], synopsis: 'The founding story of Facebook.', streamingPlatform: 'Netflix', boxOffice: 225000000, releaseDate: '2010-10-01', imdbRating: 7.8, rottenTomatoes: 96 },
  { id: 16, title: 'Coco', year: 2017, director: 'Lee Unkrich', genre: ['Animation', 'Adventure', 'Family'], rating: 8.4, duration: 105, cast: ['Anthony Gonzalez', 'Gael García Bernal'], synopsis: 'A boy embarks on a journey to the Land of the Dead.', streamingPlatform: 'Disney+', boxOffice: 807000000, releaseDate: '2017-11-22', imdbRating: 8.4, rottenTomatoes: 97 },
  { id: 17, title: 'Whiplash', year: 2014, director: 'Damien Chazelle', genre: ['Drama', 'Music'], rating: 8.5, duration: 106, cast: ['Miles Teller', 'J.K. Simmons'], synopsis: 'A young drummer enrolls at a cutthroat music conservatory.', streamingPlatform: 'Amazon Prime', boxOffice: 13000000, releaseDate: '2014-10-10', imdbRating: 8.5, rottenTomatoes: 94 },
  { id: 18, title: 'Mad Max: Fury Road', year: 2015, director: 'George Miller', genre: ['Action', 'Adventure', 'Sci-Fi'], rating: 8.1, duration: 120, cast: ['Tom Hardy', 'Charlize Theron'], synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.', streamingPlatform: 'HBO Max', boxOffice: 380000000, releaseDate: '2015-05-15', imdbRating: 8.1, rottenTomatoes: 97 },
  { id: 19, title: 'The Grand Budapest Hotel', year: 2014, director: 'Wes Anderson', genre: ['Adventure', 'Comedy', 'Crime'], rating: 8.1, duration: 99, cast: ['Ralph Fiennes', 'Tony Revolori'], synopsis: 'A concierge at a famous European hotel teams up with a lobby boy.', streamingPlatform: 'Disney+', boxOffice: 174000000, releaseDate: '2014-03-28', imdbRating: 8.1, rottenTomatoes: 92 },
  { id: 20, title: 'Black Panther', year: 2018, director: 'Ryan Coogler', genre: ['Action', 'Adventure', 'Sci-Fi'], rating: 7.3, duration: 134, cast: ['Chadwick Boseman', 'Michael B. Jordan'], synopsis: 'The king of Wakanda faces a challenger to the throne.', streamingPlatform: 'Disney+', boxOffice: 1349000000, releaseDate: '2018-02-16', imdbRating: 7.3, rottenTomatoes: 96 },
  { id: 21, title: 'The Departed', year: 2006, director: 'Martin Scorsese', genre: ['Crime', 'Drama', 'Thriller'], rating: 8.5, duration: 151, cast: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'], synopsis: 'An undercover cop and a mole try to identify each other.', streamingPlatform: 'Netflix', boxOffice: 291000000, releaseDate: '2006-10-06', imdbRating: 8.5, rottenTomatoes: 91 },
  { id: 22, title: 'Everything Everywhere All at Once', year: 2022, director: 'Daniel Kwan, Daniel Scheinert', genre: ['Action', 'Adventure', 'Comedy'], rating: 7.8, duration: 139, cast: ['Michelle Yeoh', 'Ke Huy Quan'], synopsis: 'A woman must connect with parallel universe versions of herself.', streamingPlatform: 'Paramount+', boxOffice: 141000000, releaseDate: '2022-03-25', imdbRating: 7.8, rottenTomatoes: 93 },
  { id: 23, title: 'The Lion King', year: 1994, director: 'Roger Allers, Rob Minkoff', genre: ['Animation', 'Adventure', 'Drama'], rating: 8.5, duration: 88, cast: ['Matthew Broderick', 'James Earl Jones'], synopsis: 'A young lion prince flees his kingdom only to learn the true meaning of responsibility.', streamingPlatform: 'Disney+', boxOffice: 968000000, releaseDate: '1994-06-24', imdbRating: 8.5, rottenTomatoes: 93 },
  { id: 24, title: 'Oppenheimer', year: 2023, director: 'Christopher Nolan', genre: ['Biography', 'Drama', 'History'], rating: 8.3, duration: 180, cast: ['Cillian Murphy', 'Robert Downey Jr.'], synopsis: 'The story of J. Robert Oppenheimer and the development of the atomic bomb.', streamingPlatform: 'Peacock', boxOffice: 952000000, releaseDate: '2023-07-21', imdbRating: 8.3, rottenTomatoes: 93 },
  { id: 25, title: 'Spider-Man: Into the Spider-Verse', year: 2018, director: 'Bob Persichetti, Peter Ramsey', genre: ['Animation', 'Action', 'Adventure'], rating: 8.4, duration: 117, cast: ['Shameik Moore', 'Hailee Steinfeld'], synopsis: 'A teen becomes Spider-Man and meets alternate Spider-People.', streamingPlatform: 'Netflix', boxOffice: 375000000, releaseDate: '2018-12-14', imdbRating: 8.4, rottenTomatoes: 97 },
  { id: 26, title: 'The Silence of the Lambs', year: 1991, director: 'Jonathan Demme', genre: ['Crime', 'Drama', 'Thriller'], rating: 8.6, duration: 118, cast: ['Jodie Foster', 'Anthony Hopkins'], synopsis: 'An FBI trainee seeks the help of an imprisoned cannibal to catch a serial killer.', streamingPlatform: 'Amazon Prime', boxOffice: 272000000, releaseDate: '1991-02-14', imdbRating: 8.6, rottenTomatoes: 96 },
  { id: 27, title: 'Gladiator', year: 2000, director: 'Ridley Scott', genre: ['Action', 'Adventure', 'Drama'], rating: 8.5, duration: 155, cast: ['Russell Crowe', 'Joaquin Phoenix'], synopsis: 'A former Roman General seeks revenge against the emperor.', streamingPlatform: 'Netflix', boxOffice: 460000000, releaseDate: '2000-05-05', imdbRating: 8.5, rottenTomatoes: 77 },
  { id: 28, title: 'WALL-E', year: 2008, director: 'Andrew Stanton', genre: ['Animation', 'Adventure', 'Family'], rating: 8.4, duration: 98, cast: ['Ben Burtt', 'Elissa Knight'], synopsis: 'A small waste-collecting robot embarks on a space journey.', streamingPlatform: 'Disney+', boxOffice: 534000000, releaseDate: '2008-06-27', imdbRating: 8.4, rottenTomatoes: 95 },
  { id: 29, title: 'Arrival', year: 2016, director: 'Denis Villeneuve', genre: ['Drama', 'Sci-Fi'], rating: 7.9, duration: 116, cast: ['Amy Adams', 'Jeremy Renner'], synopsis: 'A linguist is recruited to communicate with aliens.', streamingPlatform: 'Paramount+', boxOffice: 203000000, releaseDate: '2016-11-11', imdbRating: 7.9, rottenTomatoes: 94 },
  { id: 30, title: 'The Truman Show', year: 1998, director: 'Peter Weir', genre: ['Comedy', 'Drama', 'Sci-Fi'], rating: 8.2, duration: 103, cast: ['Jim Carrey', 'Laura Linney'], synopsis: 'A man discovers his entire life is a reality TV show.', streamingPlatform: 'Netflix', boxOffice: 264000000, releaseDate: '1998-06-05', imdbRating: 8.2, rottenTomatoes: 95 }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, genre, director, minYear, maxYear, minRating } = req.query;
  let filtered = [...movies];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(m => m.title.toLowerCase().includes(q) || m.director.toLowerCase().includes(q) || m.cast.some(c => c.toLowerCase().includes(q))); }
  if (genre) filtered = filtered.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
  if (director) filtered = filtered.filter(m => m.director.toLowerCase().includes(director.toLowerCase()));
  if (minYear) filtered = filtered.filter(m => m.year >= parseInt(minYear));
  if (maxYear) filtered = filtered.filter(m => m.year <= parseInt(maxYear));
  if (minRating) filtered = filtered.filter(m => m.rating >= parseFloat(minRating));
  const start = (page - 1) * limit;
  res.json({ movies: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/genres', (req, res) => {
  const genres = {};
  movies.forEach(m => m.genre.forEach(g => { genres[g] = (genres[g] || 0) + 1; }));
  res.json({ genres: Object.entries(genres).map(([name, count]) => ({ name, count })) });
});

router.get('/genres/:genre', (req, res) => {
  const results = movies.filter(m => m.genre.some(g => g.toLowerCase() === req.params.genre.toLowerCase()));
  res.json({ genre: req.params.genre, count: results.length, movies: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q (query) required' });
  const query = q.toLowerCase();
  const results = movies.filter(m => m.title.toLowerCase().includes(query) || m.director.toLowerCase().includes(query) || m.cast.some(c => c.toLowerCase().includes(query)));
  res.json({ query: q, count: results.length, movies: results });
});

router.get('/top-rated', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, movies: [...movies].sort((a, b) => b.rating - a.rating).slice(0, limit) });
});

router.get('/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, movies: [...movies].sort((a, b) => b.year - a.year).slice(0, limit) });
});

router.get('/stats', (req, res) => {
  const genreCounts = {};
  const directorCounts = {};
  movies.forEach(m => { m.genre.forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; }); directorCounts[m.director] = (directorCounts[m.director] || 0) + 1; });
  res.json({ totalMovies: movies.length, averageRating: (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(2), averageDuration: Math.round(movies.reduce((s, m) => s + m.duration, 0) / movies.length), totalBoxOffice: movies.reduce((s, m) => s + m.boxOffice, 0), genres: genreCounts, topDirectors: Object.entries(directorCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })) });
});

router.post('/', (req, res) => {
  const movie = { id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1, ...req.body };
  movies.push(movie);
  res.status(201).json(movie);
});

router.get('/trending', (req, res) => {
  const trending = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  res.json({ count: trending.length, movies: trending });
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/:id/streaming', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json({ movieId: movie.id, title: movie.title, streamingPlatform: movie.streamingPlatform, alternatives: ['Netflix', 'Hulu', 'Amazon Prime', 'HBO Max', 'Paramount+'].filter(p => p !== movie.streamingPlatform).slice(0, 2) });
});

router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

router.put('/:id', (req, res) => {
  const idx = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Movie not found' });
  movies[idx] = { ...movies[idx], ...req.body, id: movies[idx].id };
  res.json(movies[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Movie not found' });
  Object.assign(movies[idx], req.body);
  res.json(movies[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Movie not found' });
  const deleted = movies.splice(idx, 1);
  res.json(deleted[0]);
});

router.get('/:id/reviews', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json({ movieId: movie.id, title: movie.title, imdbRating: movie.imdbRating, rottenTomatoes: movie.rottenTomatoes, reviews: [
    { id: 1, rating: 5, comment: 'Absolutely brilliant!', author: 'CriticOne', date: '2026-05-10T10:00:00Z' },
    { id: 2, rating: 4, comment: 'Great film, worth watching.', author: 'MovieFan', date: '2026-05-15T14:30:00Z' }
  ]});
});

router.post('/:id/reviews', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.status(201).json({ id: Date.now(), movieId: movie.id, ...req.body, date: new Date().toISOString() });
});

router.get('/:id/cast', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json({ movieId: movie.id, title: movie.title, cast: movie.cast });
});

module.exports = router;
