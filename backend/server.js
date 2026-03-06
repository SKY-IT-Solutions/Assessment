const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

let movies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    genre: 'Sci-Fi',
    year: 2024,
    status: 'watched',
    rating: 5,
    notes: 'Absolutely stunning cinematography. Hans Zimmer delivered again.',
    addedAt: '2024-03-10',
  },
  {
    id: 2,
    title: 'Poor Things',
    director: 'Yorgos Lanthimos',
    genre: 'Drama',
    year: 2023,
    status: 'watched',
    rating: 4,
    notes: 'Wildly imaginative. Emma Stone gives a career-best performance.',
    addedAt: '2024-02-14',
  },
  {
    id: 3,
    title: 'The Zone of Interest',
    director: 'Jonathan Glazer',
    genre: 'Drama',
    year: 2023,
    status: 'want-to-watch',
    rating: null,
    notes: '',
    addedAt: '2024-03-01',
  },
  {
    id: 4,
    title: 'Past Lives',
    director: 'Celine Song',
    genre: 'Romance',
    year: 2023,
    status: 'watching',
    rating: null,
    notes: 'Started it — already emotional.',
    addedAt: '2024-01-22',
  },
  {
    id: 5,
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    genre: 'Historical',
    year: 2023,
    status: 'watched',
    rating: 5,
    notes: 'Three hours flew by. Cillian Murphy is extraordinary.',
    addedAt: '2024-01-05',
  },
  {
    id: 6,
    title: 'All of Us Strangers',
    director: 'Andrew Haigh',
    genre: 'Drama',
    year: 2023,
    status: 'want-to-watch',
    rating: null,
    notes: '',
    addedAt: '2024-03-18',
  },
];

let nextId = 7;

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:movieId', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, director, genre, year, notes } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newMovie = {
    id: nextId++,
    title,
    director: director || '',
    genre: genre || 'Unknown',
    year: year ? parseInt(year) : null,
    status: 'want-to-watch',
    rating: null,
    notes: notes || '',
    addedAt: new Date().toISOString().split('T')[0],
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Movie not found' });

  movies[index + 1] = { ...movies[index + 1], ...req.body, id: movies[index + 1]?.id };
  res.json(movies[index]);
});

app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = movies.some(m => m.id === id);
  if (!exists) return res.status(404).json({ error: 'Movie not found' });
  movies = movies.filter(m => m.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`CineLog API running → http://localhost:${PORT}`);
});
