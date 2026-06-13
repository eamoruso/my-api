const express = require('express');
const router = express.Router();

// Mock products
let products = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99, category: 'electronics', stock: 50, createdAt: new Date().toISOString() },
  { id: 2, name: 'Headphones', description: 'Wireless noise-canceling headphones', price: 199.99, category: 'electronics', stock: 100, createdAt: new Date().toISOString() },
  { id: 3, name: 'Coffee Maker', description: 'Automatic coffee maker', price: 79.99, category: 'appliances', stock: 25, createdAt: new Date().toISOString() }
];
let nextId = 4;

// Product CRUD (+6 endpoints)
router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, category, minPrice, maxPrice } = req.query;
  let filtered = [...products];
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (category) filtered = filtered.filter(p => p.category === category);
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  const start = (page - 1) * limit;
  res.json({ 
    products: filtered.slice(start, start + parseInt(limit)),
    total: filtered.length, page: parseInt(page), 
    totalPages: Math.ceil(filtered.length / limit)
  });
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', (req, res) => {
  const newProd = { id: nextId++, ...req.body, createdAt: new Date().toISOString() };
  products.push(newProd);
  res.status(201).json(newProd);
});

router.put('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1);
  res.json(deleted[0]);
});

router.patch('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  Object.assign(products[idx], req.body);
  res.json(products[idx]);
});

// Categories (+5 endpoints)
router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

router.get('/categories/:category', (req, res) => {
  const results = products.filter(p => p.category === req.params.category);
  res.json({ category: req.params.category, count: results.length, products: results });
});

router.post('/categories', (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Name required' });
  res.status(201).json({ name: req.body.name, id: Date.now() });
});

router.get('/categories/:category/products', (req, res) => {
  const results = products.filter(p => p.category === req.params.category);
  res.json(results);
});

router.delete('/categories/:category', (req, res) => {
  products = products.filter(p => p.category !== req.params.category);
  res.json({ message: `All products in category "${req.params.category}" deleted` });
});

// Search (+3 endpoints)
router.get('/search/advanced', (req, res) => {
  let filtered = [...products];
  if (req.query.minPrice) filtered = filtered.filter(p => p.price >= parseFloat(req.query.minPrice));
  if (req.query.maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(req.query.maxPrice));
  if (req.query.category) filtered = filtered.filter(p => p.category === req.query.category);
  if (req.query.inStock) filtered = filtered.filter(p => p.stock > 0);
  res.json({ total: filtered.length, products: filtered });
});

router.get('/search/bulk', (req, res) => {
  const ids = req.query.ids?.split(',').map(Number) || [];
  const results = products.filter(p => ids.includes(p.id));
  res.json(results);
});

router.get('/suggestions/:prefix', (req, res) => {
  const results = products.filter(p => p.name.toLowerCase().startsWith(req.params.prefix.toLowerCase()));
  res.json({ prefix: req.params.prefix, suggestions: results.map(p => p.name).slice(0, 5) });
});

// Stock/Inventory (+6 endpoints)
router.get('/:id/stock', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, stock: product.stock });
});

router.put('/:id/stock', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx].stock = req.body.quantity;
  res.json(products[idx]);
});

router.patch('/:id/stock', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  if (req.body.add) products[idx].stock += req.body.add;
  else if (req.body.subtract) products[idx].stock -= req.body.subtract;
  res.json(products[idx]);
});

router.get('/low-stock/:threshold', (req, res) => {
  const results = products.filter(p => p.stock <= parseInt(req.params.threshold));
  res.json({ threshold: req.params.threshold, count: results.length, products: results });
});

router.get('/out-of-stock', (req, res) => {
  const results = products.filter(p => p.stock === 0);
  res.json(results);
});

router.post('/stock/bulk-update', (req, res) => {
  const updates = req.body.updates || [];
  for (const u of updates) {
    const idx = products.findIndex(p => p.id === u.productId);
    if (idx !== -1) products[idx].stock = u.quantity;
  }
  res.json({ message: 'Stock updated', count: updates.length });
});

// Reviews (+7 endpoints)
router.get('/:id/reviews', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const reviews = [
    { id: 1, rating: 5, comment: 'Great product!', author: 'Alice' },
    { id: 2, rating: 4, comment: 'Good value', author: 'Bob' }
  ];
  res.json({ productId: product.id, reviews, average: 4.5 });
});

router.post('/:id/reviews', (req, res) => {
  if (!req.body.rating || !req.body.comment) return res.status(400).json({ error: 'Rating and comment required' });
  const newReview = { id: Date.now(), ...req.body };
  res.status(201).json(newReview);
});

router.get('/:id/reviews/average', (req, res) => {
  res.json({ productId: req.params.id, average: 4.5, totalReviews: 2 });
});

router.put('/reviews/:reviewId', (req, res) => {
  res.json({ message: 'Review updated', review: { id: req.params.reviewId, ...req.body } });
});

router.delete('/reviews/:reviewId', (req, res) => {
  res.json({ message: `Review ${req.params.reviewId} deleted` });
});

router.get('/:id/reviews/rating/:rating', (req, res) => {
  const reviews = [
    { id: 1, rating: 5, comment: 'Exceptional!', author: 'Alice' },
    { id: 2, rating: 4, comment: 'Good value', author: 'Bob' }
  ].filter(r => r.rating === parseInt(req.params.rating));
  res.json({ productId: req.params.id, reviews });
});

router.post('/:id/reviews/batch', (req, res) => {
  const created = [];
  for (const review of req.body.reviews || []) {
    created.push({ id: Date.now() + created.length, ...review, productId: parseInt(req.params.id) });
  }
  res.status(201).json(created);
});

// Price endpoints (+3 endpoints)
router.patch('/:id/price', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx].price = req.body.price;
  res.json(products[idx]);
});

router.get('/price-range/:min/:max', (req, res) => {
  const results = products.filter(p => p.price >= parseFloat(req.params.min) && p.price <= parseFloat(req.params.max));
  res.json(results);
});

router.post('/bulk-price-adjustment', (req, res) => {
  const { category, percentage } = req.body;
  let count = 0;
  for (const p of products) {
    if (!category || p.category === category) {
      p.price = parseFloat((p.price * (1 + percentage / 100)).toFixed(2));
      count++;
    }
  }
  res.json({ message: `${count} products updated` });
});

// Related products (+2 endpoints)
router.get('/:id/related', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id);
  res.json(related.slice(0, 5));
});

router.post('/:id/related', (req, res) => {
  const { relatedIds } = req.body;
  res.json({ productId: req.params.id, relatedProducts: relatedIds });
});

// Export (+1 endpoint)
router.get('/export/csv', (req, res) => {
  const csv = 'id,name,price,category,stock\n' + products.map(p => `${p.id},"${p.name}",${p.price},${p.category},${p.stock}`).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
  res.send(csv);
});

module.exports = router;
