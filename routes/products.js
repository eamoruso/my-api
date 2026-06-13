const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'MacBook Pro 16"', description: 'Apple M3 Pro chip, 18GB RAM, 512GB SSD', price: 2499.99, category: 'electronics', brand: 'Apple', stock: 45, rating: 4.8, reviewCount: 342, sku: 'MBP-16-M3P' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', description: '256GB, Titanium Black', price: 1299.99, category: 'electronics', brand: 'Samsung', stock: 120, rating: 4.6, reviewCount: 891, sku: 'SGS24U-256' },
  { id: 3, name: 'Sony WH-1000XM5', description: 'Wireless Noise Cancelling Headphones', price: 349.99, category: 'electronics', brand: 'Sony', stock: 200, rating: 4.7, reviewCount: 1205, sku: 'WH1000XM5' },
  { id: 4, name: 'Nike Air Max 270', description: 'Running Shoes, Black/White', price: 149.99, category: 'clothing', brand: 'Nike', stock: 85, rating: 4.4, reviewCount: 567, sku: 'NAM270-BW' },
  { id: 5, name: 'Dyson V15 Detect', description: 'Cordless Vacuum with Laser Dust Detection', price: 749.99, category: 'home', brand: 'Dyson', stock: 30, rating: 4.9, reviewCount: 423, sku: 'DV15-DET' },
  { id: 6, name: 'Canon EOS R6 Mark II', description: '24.2MP Full-Frame Mirrorless Camera', price: 2499.99, category: 'electronics', brand: 'Canon', stock: 15, rating: 4.8, reviewCount: 198, sku: 'EOSR6M2' },
  { id: 7, name: 'Adidas Ultraboost Light', description: 'Running Shoes, Cloud White', price: 189.99, category: 'clothing', brand: 'Adidas', stock: 95, rating: 4.5, reviewCount: 334, sku: 'AUL-CW' },
  { id: 8, name: 'LG OLED C4 65"', description: '4K OLED Smart TV', price: 1799.99, category: 'electronics', brand: 'LG', stock: 25, rating: 4.7, reviewCount: 256, sku: 'LGC4-65' },
  { id: 9, name: 'Le Creuset Dutch Oven', description: '5.5 Qt, Flame Orange', price: 379.99, category: 'home', brand: 'Le Creuset', stock: 40, rating: 4.9, reviewCount: 789, sku: 'LC-DO-55' },
  { id: 10, name: 'Bose QuietComfort Ultra', description: 'Wireless Earbuds with Spatial Audio', price: 299.99, category: 'electronics', brand: 'Bose', stock: 75, rating: 4.6, reviewCount: 445, sku: 'BQC-ULTRA' },
  { id: 11, name: 'Patagonia Better Sweater', description: 'Fleece Jacket, New Navy', price: 139.00, category: 'clothing', brand: 'Patagonia', stock: 60, rating: 4.5, reviewCount: 234, sku: 'PBS-M-NN' },
  { id: 12, name: 'iRobot Roomba j9+', description: 'Self-Emptying Robot Vacuum', price: 899.99, category: 'home', brand: 'iRobot', stock: 20, rating: 4.4, reviewCount: 567, sku: 'IRJ9-PLUS' },
  { id: 13, name: 'Nintendo Switch OLED', description: 'White Joy-Con Bundle', price: 349.99, category: 'electronics', brand: 'Nintendo', stock: 55, rating: 4.8, reviewCount: 2100, sku: 'NSW-OLED-W' },
  { id: 14, name: 'Yeti Rambler 20oz', description: 'Insulated Tumbler, Navy', price: 35.00, category: 'home', brand: 'Yeti', stock: 300, rating: 4.7, reviewCount: 1567, sku: 'YR-20-NV' },
  { id: 15, name: 'Under Armour HOVR Phantom 3', description: 'Running Shoes, Black/White', price: 159.99, category: 'clothing', brand: 'Under Armour', stock: 70, rating: 4.3, reviewCount: 189, sku: 'UAHP3-BW' },
  { id: 16, name: 'KitchenAid Stand Mixer', description: '5 Qt, Artisan Series, Empire Red', price: 449.99, category: 'home', brand: 'KitchenAid', stock: 35, rating: 4.8, reviewCount: 3200, sku: 'KASM-5ER' },
  { id: 17, name: 'Sony PlayStation 5', description: 'Digital Edition', price: 449.99, category: 'electronics', brand: 'Sony', stock: 10, rating: 4.9, reviewCount: 4500, sku: 'PS5-DIG' },
  { id: 18, name: 'Columbia Bugaboo II', description: 'Interchange Jacket', price: 160.00, category: 'clothing', brand: 'Columbia', stock: 45, rating: 4.4, reviewCount: 312, sku: 'CBII-M' },
  { id: 19, name: 'Instant Pot Duo 7-in-1', description: '6 Qt Multi-Use Pressure Cooker', price: 89.95, category: 'home', brand: 'Instant Pot', stock: 150, rating: 4.7, reviewCount: 8900, sku: 'IP-DUO-6' },
  { id: 20, name: 'Apple Watch Series 9', description: '45mm, GPS, Midnight Aluminum', price: 429.00, category: 'electronics', brand: 'Apple', stock: 65, rating: 4.7, reviewCount: 1567, sku: 'AWS9-45-M' },
  { id: 21, name: 'The North Face Nuptse', description: 'Down Jacket, TNF Black', price: 279.00, category: 'clothing', brand: 'The North Face', stock: 40, rating: 4.6, reviewCount: 445, sku: 'TNFN-M-TB' },
  { id: 22, name: 'Vitamix A3500', description: 'Ascent Series Blender, Brushed Stainless', price: 649.95, category: 'home', brand: 'Vitamix', stock: 18, rating: 4.8, reviewCount: 678, sku: 'VA3500-BS' },
  { id: 23, name: 'Bose SoundLink Max', description: 'Portable Bluetooth Speaker', price: 399.00, category: 'electronics', brand: 'Bose', stock: 50, rating: 4.5, reviewCount: 234, sku: 'BSL-MAX' },
  { id: 24, name: 'Lululemon Align Pant', description: "Women's 25\", Black", price: 98.00, category: 'clothing', brand: 'Lululemon', stock: 110, rating: 4.8, reviewCount: 2345, sku: 'LAP-25-BK' },
  { id: 25, name: 'Ninja Foodi Air Fryer', description: '6 Qt, 4-in-1, Black', price: 119.99, category: 'home', brand: 'Ninja', stock: 80, rating: 4.6, reviewCount: 1234, sku: 'NFAF-6-4' },
  { id: 26, name: 'Garmin Fenix 7X', description: 'Solar Multisport GPS Watch', price: 899.99, category: 'electronics', brand: 'Garmin', stock: 22, rating: 4.7, reviewCount: 345, sku: 'GF7X-SOL' },
  { id: 27, name: "Arc'teryx Beta LT", description: 'Waterproof Jacket, Black', price: 399.00, category: 'clothing', brand: "Arc'teryx", stock: 25, rating: 4.9, reviewCount: 178, sku: 'ABLT-M-BK' },
  { id: 28, name: 'Sonos Era 300', description: 'Premium Spatial Audio Speaker', price: 449.00, category: 'electronics', brand: 'Sonos', stock: 30, rating: 4.6, reviewCount: 289, sku: 'SE300' },
  { id: 29, name: 'All-Clad D5 Stainless Set', description: '10-Piece Cookware Set', price: 699.95, category: 'home', brand: 'All-Clad', stock: 12, rating: 4.8, reviewCount: 567, sku: 'ACD5-10PC' },
  { id: 30, name: 'Razer BlackWidow V4', description: 'Wireless Mechanical Gaming Keyboard', price: 229.99, category: 'electronics', brand: 'Razer', stock: 40, rating: 4.5, reviewCount: 198, sku: 'RBWV4-WL' }
];
let nextId = 31;

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, category, brand, minPrice, maxPrice, minRating } = req.query;
  let filtered = [...products];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
  if (category) filtered = filtered.filter(p => p.category === category);
  if (brand) filtered = filtered.filter(p => p.brand === brand);
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  if (minRating) filtered = filtered.filter(p => p.rating >= parseFloat(minRating));
  const start = (page - 1) * limit;
  res.json({ products: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/stats', (req, res) => {
  const cats = {};
  const brands = {};
  products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; brands[p.brand] = (brands[p.brand] || 0) + 1; });
  res.json({ total: products.length, averagePrice: (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2), categories: cats, brands });
});

router.get('/featured', (req, res) => {
  res.json({ products: products.filter(p => p.rating >= 4.8).slice(0, 5) });
});

router.get('/categories', (req, res) => {
  const cats = {};
  products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
  res.json({ categories: Object.keys(cats).map(c => ({ name: c, count: cats[c] })) });
});

router.get('/categories/:category', (req, res) => {
  const results = products.filter(p => p.category === req.params.category);
  res.json({ category: req.params.category, count: results.length, products: results });
});

router.get('/brands', (req, res) => {
  const brands = {};
  products.forEach(p => { brands[p.brand] = (brands[p.brand] || 0) + 1; });
  res.json({ brands: Object.keys(brands).map(b => ({ name: b, count: brands[b] })) });
});

router.get('/brands/:brand', (req, res) => {
  const results = products.filter(p => p.brand === req.params.brand);
  res.json({ brand: req.params.brand, count: results.length, products: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  const query = q.toLowerCase();
  const results = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  res.json({ query: q, count: results.length, products: results });
});

router.get('/price-range', (req, res) => {
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Infinity;
  const results = products.filter(p => p.price >= min && p.price <= max);
  res.json({ min, max, count: results.length, products: results });
});

router.get('/recommendations', (req, res) => {
  const productId = parseInt(req.query.productId);
  const product = products.find(p => p.id === productId);
  if (!product) return res.json({ products: products.slice(0, 5) });
  const recs = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  res.json({ productId, recommendations: recs });
});

router.post('/', (req, res) => {
  const product = { id: nextId++, createdAt: new Date().toISOString(), ...req.body };
  products.push(product);
  res.status(201).json(product);
});

router.post('/bulk', (req, res) => {
  const created = [];
  for (const data of (req.body.products || [])) {
    const product = { id: nextId++, ...data };
    products.push(product);
    created.push(product);
  }
  res.status(201).json({ count: created.length, products: created });
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/:id/reviews', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, averageRating: product.rating, totalReviews: product.reviewCount, reviews: [
    { id: 1, rating: 5, comment: 'Excellent product!', author: 'Alice', date: '2026-05-15' },
    { id: 2, rating: 4, comment: 'Good value for money', author: 'Bob', date: '2026-05-20' }
  ]});
});

router.post('/:id/reviews', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.status(201).json({ id: Date.now(), productId: product.id, ...req.body, date: new Date().toISOString() });
});

router.get('/:id/availability', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, available: product.stock > 0, stock: product.stock });
});

router.get('/:id/variants', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, title: product.title, variants: [
    { id: 1, name: 'Default', price: product.price, stock: product.stock, sku: `${product.sku}-001` },
    { id: 2, name: 'Premium', price: Math.round(product.price * 1.25), stock: Math.floor(product.stock / 2), sku: `${product.sku}-002` }
  ]});
});

router.get('/:id/related', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  res.json({ productId: product.id, related });
});

router.post('/:id/compare', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const ids = req.body.productIds || [];
  const others = products.filter(p => ids.includes(p.id));
  res.json({ base: { name: product.name, price: product.price, rating: product.rating }, comparisons: others.map(p => ({ name: p.name, price: p.price, rating: p.rating })) });
});

router.post('/:id/rate', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { rating } = req.body;
  if (!rating) return res.status(400).json({ error: 'rating required' });
  product.rating = ((product.rating * product.reviewCount + rating) / (product.reviewCount + 1)).toFixed(1);
  product.reviewCount++;
  res.json({ productId: product.id, newRating: product.rating, reviewCount: product.reviewCount });
});

router.post('/:id/flag', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, flagged: true, reason: req.body.reason || 'inappropriate' });
});

router.post('/:id/notify', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ productId: product.id, notificationScheduled: true, email: req.body.email });
});

router.post('/:id/quantity', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { change } = req.body;
  product.stock = Math.max(0, product.stock + (change || 0));
  res.json({ productId: product.id, stock: product.stock });
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.put('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  res.json(products[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  Object.assign(products[idx], req.body);
  res.json(products[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
