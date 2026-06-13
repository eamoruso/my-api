const express = require('express');
const router = express.Router();

const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', genre: 'Fiction', pages: 281, publishedYear: 1960, publisher: 'J.B. Lippincott', rating: 4.5, reviewCount: 4523, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 12.99, synopsis: 'A novel about racial injustice in the Deep South.' },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', genre: 'Science Fiction', pages: 328, publishedYear: 1949, publisher: 'Secker & Warburg', rating: 4.4, reviewCount: 3891, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 11.99, synopsis: 'A dystopian novel set in a totalitarian society.' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', genre: 'Fiction', pages: 180, publishedYear: 1925, publisher: "Charles Scribner's Sons", rating: 4.3, reviewCount: 3456, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 10.99, synopsis: 'A story of wealth, love, and the American Dream.' },
  { id: 4, title: 'Dune', author: 'Frank Herbert', isbn: '978-0-441-17271-9', genre: 'Science Fiction', pages: 688, publishedYear: 1965, publisher: 'Chilton Books', rating: 4.6, reviewCount: 2890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'A desert planet, political intrigue, and a chosen one.' },
  { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', genre: 'Romance', pages: 432, publishedYear: 1813, publisher: 'T. Egerton', rating: 4.4, reviewCount: 3120, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 9.99, synopsis: 'A romantic novel about manners and marriage.' },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0-547-92822-7', genre: 'Fantasy', pages: 310, publishedYear: 1937, publisher: 'George Allen & Unwin', rating: 4.7, reviewCount: 4100, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 13.99, synopsis: 'A hobbit embarks on an unexpected journey.' },
  { id: 7, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '978-0-590-35340-3', genre: 'Fantasy', pages: 309, publishedYear: 1997, publisher: 'Bloomsbury', rating: 4.8, reviewCount: 5600, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'], price: 12.99, synopsis: 'A young wizard discovers his magical heritage.' },
  { id: 8, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0-316-76948-0', genre: 'Fiction', pages: 277, publishedYear: 1951, publisher: 'Little, Brown', rating: 4.0, reviewCount: 2780, language: 'English', format: ['Hardcover', 'Paperback'], price: 11.99, synopsis: 'A teenager navigates adulthood in New York City.' },
  { id: 9, title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-0-06-231609-7', genre: 'Non-Fiction', pages: 443, publishedYear: 2011, publisher: 'Harper', rating: 4.5, reviewCount: 3200, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'], price: 16.99, synopsis: 'A brief history of humankind.' },
  { id: 10, title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '978-0-385-50420-3', genre: 'Mystery', pages: 689, publishedYear: 2003, publisher: 'Doubleday', rating: 4.1, reviewCount: 2560, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'A murder mystery involving religious symbology.' },
  { id: 11, title: 'Atomic Habits', author: 'James Clear', isbn: '978-0-7352-1129-2', genre: 'Self-Help', pages: 320, publishedYear: 2018, publisher: 'Avery', rating: 4.7, reviewCount: 4890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'], price: 16.99, synopsis: 'An easy and proven way to build good habits.' },
  { id: 12, title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-0-06-112241-5', genre: 'Fiction', pages: 197, publishedYear: 1988, publisher: 'HarperOne', rating: 4.3, reviewCount: 3450, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 11.99, synopsis: 'A shepherd boy travels to Egypt in search of treasure.' },
  { id: 13, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '978-0-374-53355-7', genre: 'Non-Fiction', pages: 499, publishedYear: 2011, publisher: 'Farrar, Straus and Giroux', rating: 4.4, reviewCount: 2890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 17.99, synopsis: 'How two systems drive the way we think.' },
  { id: 14, title: 'Gone Girl', author: 'Gillian Flynn', isbn: '978-0-307-58837-1', genre: 'Mystery', pages: 432, publishedYear: 2012, publisher: 'Crown', rating: 4.2, reviewCount: 2340, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 13.99, synopsis: 'A wife disappears on her wedding anniversary.' },
  { id: 15, title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-0-553-10953-5', genre: 'Non-Fiction', pages: 256, publishedYear: 1988, publisher: 'Bantam Dell', rating: 4.5, reviewCount: 3100, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 15.99, synopsis: 'From the Big Bang to black holes.' },
  { id: 16, title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '978-0-307-45454-0', genre: 'Mystery', pages: 672, publishedYear: 2005, publisher: 'Norstedts Förlag', rating: 4.3, reviewCount: 2670, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'A journalist and hacker investigate a wealthy family.' },
  { id: 17, title: 'The Kite Runner', author: 'Khaled Hosseini', isbn: '978-1-59448-000-3', genre: 'Fiction', pages: 371, publishedYear: 2003, publisher: 'Riverhead Books', rating: 4.6, reviewCount: 3890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 12.99, synopsis: 'A story of friendship set in Afghanistan.' },
  { id: 18, title: 'Educated', author: 'Tara Westover', isbn: '978-0-399-59050-4', genre: 'Biography', pages: 352, publishedYear: 2018, publisher: 'Random House', rating: 4.5, reviewCount: 3200, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'], price: 15.99, synopsis: 'A memoir about growing up in a survivalist family.' },
  { id: 19, title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '978-1-250-30169-7', genre: 'Mystery', pages: 352, publishedYear: 2019, publisher: 'Celadon Books', rating: 4.3, reviewCount: 2890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 13.99, synopsis: 'A therapist becomes obsessed with a patient who stopped speaking.' },
  { id: 20, title: 'The Road', author: 'Cormac McCarthy', isbn: '978-0-307-38789-9', genre: 'Fiction', pages: 287, publishedYear: 2006, publisher: 'Alfred A. Knopf', rating: 4.4, reviewCount: 2560, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 12.99, synopsis: 'A father and son survive in a post-apocalyptic world.' },
  { id: 21, title: 'The Power of Now', author: 'Eckhart Tolle', isbn: '978-1-57731-480-6', genre: 'Self-Help', pages: 236, publishedYear: 1997, publisher: 'New World Library', rating: 4.3, reviewCount: 2890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'A guide to spiritual enlightenment.' },
  { id: 22, title: 'Catch-22', author: 'Joseph Heller', isbn: '978-0-684-83339-2', genre: 'Fiction', pages: 453, publishedYear: 1961, publisher: 'Simon & Schuster', rating: 4.4, reviewCount: 2340, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 11.99, synopsis: 'A satirical novel about World War II.' },
  { id: 23, title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', isbn: '978-1-4000-5217-2', genre: 'Biography', pages: 381, publishedYear: 2010, publisher: 'Crown', rating: 4.6, reviewCount: 3100, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'The story of the woman behind the HeLa cells.' },
  { id: 24, title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0-06-085052-4', genre: 'Science Fiction', pages: 288, publishedYear: 1932, publisher: 'Chatto & Windus', rating: 4.3, reviewCount: 2780, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 11.99, synopsis: 'A dystopian future where technology controls humanity.' },
  { id: 25, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', isbn: '978-0-06-245771-4', genre: 'Self-Help', pages: 224, publishedYear: 2016, publisher: 'HarperOne', rating: 4.1, reviewCount: 3450, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 15.99, synopsis: 'A counterintuitive approach to living a good life.' },
  { id: 26, title: 'The Hunger Games', author: 'Suzanne Collins', isbn: '978-0-439-02348-1', genre: 'Science Fiction', pages: 374, publishedYear: 2008, publisher: 'Scholastic', rating: 4.4, reviewCount: 4200, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 12.99, synopsis: 'A dystopian reality show where teens fight to the death.' },
  { id: 27, title: 'Mindset', author: 'Carol S. Dweck', isbn: '978-0-345-47232-8', genre: 'Self-Help', pages: 276, publishedYear: 2006, publisher: 'Random House', rating: 4.5, reviewCount: 2890, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 14.99, synopsis: 'The new psychology of success.' },
  { id: 28, title: 'The Shining', author: 'Stephen King', isbn: '978-0-307-74365-7', genre: 'Horror', pages: 447, publishedYear: 1977, publisher: 'Doubleday', rating: 4.5, reviewCount: 3200, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 13.99, synopsis: 'A family becomes isolated in a haunted hotel.' },
  { id: 29, title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '978-0-553-29698-3', genre: 'Biography', pages: 283, publishedYear: 1947, publisher: 'Contact Publishing', rating: 4.7, reviewCount: 4560, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 10.99, synopsis: 'The wartime diary of Anne Frank.' },
  { id: 30, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', isbn: '978-0-14-044913-6', genre: 'Fiction', pages: 671, publishedYear: 1866, publisher: 'The Russian Messenger', rating: 4.5, reviewCount: 2340, language: 'English', format: ['Hardcover', 'Paperback', 'Ebook'], price: 12.99, synopsis: 'A student commits a crime and faces the consequences.' }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, genre, author, minYear, maxYear, minRating } = req.query;
  let filtered = [...books];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.synopsis.toLowerCase().includes(q)); }
  if (genre) filtered = filtered.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  if (author) filtered = filtered.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (minYear) filtered = filtered.filter(b => b.publishedYear >= parseInt(minYear));
  if (maxYear) filtered = filtered.filter(b => b.publishedYear <= parseInt(maxYear));
  if (minRating) filtered = filtered.filter(b => b.rating >= parseFloat(minRating));
  const start = (page - 1) * limit;
  res.json({ books: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/genres', (req, res) => {
  const genres = {};
  books.forEach(b => { genres[b.genre] = (genres[b.genre] || 0) + 1; });
  res.json({ genres: Object.entries(genres).map(([name, count]) => ({ name, count })) });
});

router.get('/genres/:genre', (req, res) => {
  const results = books.filter(b => b.genre.toLowerCase() === req.params.genre.toLowerCase());
  res.json({ genre: req.params.genre, count: results.length, books: results });
});

router.get('/authors', (req, res) => {
  const authors = {};
  books.forEach(b => { authors[b.author] = (authors[b.author] || 0) + 1; });
  res.json({ authors: Object.entries(authors).map(([name, count]) => ({ name, count })) });
});

router.get('/authors/:author', (req, res) => {
  const results = books.filter(b => b.author.toLowerCase().includes(req.params.author.toLowerCase()));
  res.json({ author: req.params.author, count: results.length, books: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q (query) required' });
  const query = q.toLowerCase();
  const results = books.filter(b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query) || b.isbn.includes(q));
  res.json({ query: q, count: results.length, books: results });
});

router.get('/top-rated', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, books: [...books].sort((a, b) => b.rating - a.rating).slice(0, limit) });
});

router.get('/bestsellers', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, books: [...books].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit) });
});

router.get('/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, books: [...books].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, limit) });
});

router.get('/stats', (req, res) => {
  const genreCounts = {};
  const authorCounts = {};
  books.forEach(b => { genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1; authorCounts[b.author] = (authorCounts[b.author] || 0) + 1; });
  res.json({ totalBooks: books.length, averageRating: (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(2), totalPages: books.reduce((s, b) => s + b.pages, 0), genres: genreCounts, topAuthors: Object.entries(authorCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })) });
});

router.post('/', (req, res) => {
  const book = { id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

router.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// --- Parameterized routes LAST ---

router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.put('/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body, id: books[idx].id };
  res.json(books[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  Object.assign(books[idx], req.body);
  res.json(books[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  const deleted = books.splice(idx, 1);
  res.json(deleted[0]);
});

router.get('/:id/reviews', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json({ bookId: book.id, title: book.title, averageRating: book.rating, totalReviews: book.reviewCount, reviews: [
    { id: 1, rating: 5, comment: 'Couldn\'t put it down!', author: 'BookLover42', date: '2026-05-10T10:00:00Z' },
    { id: 2, rating: 4, comment: 'Well-written and engaging.', author: 'ReaderOne', date: '2026-05-15T14:30:00Z' }
  ]});
});

router.post('/:id/reviews', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(201).json({ id: Date.now(), bookId: book.id, ...req.body, date: new Date().toISOString() });
});

module.exports = router;
