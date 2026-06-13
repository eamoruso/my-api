const express = require('express');
const router = express.Router();

let orders = [
  { id: 1, userId: 1, items: [{ productId: 1, name: 'MacBook Pro 16"', quantity: 1, price: 2499.99 }], status: 'delivered', subtotal: 2499.99, tax: 200.00, shipping: 0, total: 2699.99, createdAt: '2026-05-01T10:00:00Z', shippingAddress: { street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94105' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10001' },
  { id: 2, userId: 1, items: [{ productId: 3, name: 'Sony WH-1000XM5', quantity: 2, price: 349.99 }], status: 'shipped', subtotal: 699.98, tax: 56.00, shipping: 9.99, total: 765.97, createdAt: '2026-05-15T14:30:00Z', shippingAddress: { street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94105' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10002' },
  { id: 3, userId: 2, items: [{ productId: 4, name: 'Nike Air Max 270', quantity: 1, price: 149.99 }], status: 'delivered', subtotal: 149.99, tax: 12.00, shipping: 9.99, total: 171.98, createdAt: '2026-04-20T09:15:00Z', shippingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001' }, paymentMethod: 'paypal', trackingNumber: 'TRK10003' },
  { id: 4, userId: 3, items: [{ productId: 5, name: 'Dyson V15 Detect', quantity: 1, price: 749.99 }], status: 'processing', subtotal: 749.99, tax: 60.00, shipping: 0, total: 809.99, createdAt: '2026-06-10T11:00:00Z', shippingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 5, userId: 4, items: [{ productId: 8, name: 'LG OLED C4 65"', quantity: 1, price: 1799.99 }], status: 'pending', subtotal: 1799.99, tax: 144.00, shipping: 49.99, total: 1993.98, createdAt: '2026-06-12T16:00:00Z', shippingAddress: { street: '321 Elm St', city: 'Seattle', state: 'WA', zip: '98101' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 6, userId: 5, items: [{ productId: 9, name: 'Le Creuset Dutch Oven', quantity: 1, price: 379.99 }], status: 'delivered', subtotal: 379.99, tax: 30.40, shipping: 8.99, total: 419.38, createdAt: '2026-04-05T13:20:00Z', shippingAddress: { street: '654 Maple Dr', city: 'Boston', state: 'MA', zip: '02101' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10006' },
  { id: 7, userId: 6, items: [{ productId: 13, name: 'Nintendo Switch OLED', quantity: 1, price: 349.99 }], status: 'shipped', subtotal: 349.99, tax: 28.00, shipping: 0, total: 377.99, createdAt: '2026-06-08T10:45:00Z', shippingAddress: { street: '987 Cedar Ln', city: 'Austin', state: 'TX', zip: '73301' }, paymentMethod: 'debit_card', trackingNumber: 'TRK10007' },
  { id: 8, userId: 7, items: [{ productId: 16, name: 'KitchenAid Stand Mixer', quantity: 1, price: 449.99 }], status: 'delivered', subtotal: 449.99, tax: 36.00, shipping: 12.99, total: 498.98, createdAt: '2026-03-18T14:30:00Z', shippingAddress: { street: '147 Birch Way', city: 'Denver', state: 'CO', zip: '80201' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10008' },
  { id: 9, userId: 8, items: [{ productId: 11, name: 'Patagonia Better Sweater', quantity: 2, price: 139.00 }], status: 'canceled', subtotal: 278.00, tax: 22.24, shipping: 7.99, total: 308.23, createdAt: '2026-06-01T09:00:00Z', shippingAddress: { street: '258 Walnut St', city: 'Miami', state: 'FL', zip: '33101' }, paymentMethod: 'paypal', trackingNumber: null },
  { id: 10, userId: 9, items: [{ productId: 2, name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 1299.99 }], status: 'shipped', subtotal: 1299.99, tax: 104.00, shipping: 0, total: 1403.99, createdAt: '2026-06-05T16:00:00Z', shippingAddress: { street: '369 Spruce Ave', city: 'Portland', state: 'OR', zip: '97201' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10010' },
  { id: 11, userId: 10, items: [{ productId: 20, name: 'Apple Watch Series 9', quantity: 1, price: 429.00 }], status: 'delivered', subtotal: 429.00, tax: 34.32, shipping: 0, total: 463.32, createdAt: '2026-05-25T12:10:00Z', shippingAddress: { street: '741 Ash Blvd', city: 'Nashville', state: 'TN', zip: '37201' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10011' },
  { id: 12, userId: 11, items: [{ productId: 15, name: 'Under Armour HOVR Phantom 3', quantity: 1, price: 159.99 }], status: 'returned', subtotal: 159.99, tax: 12.80, shipping: 9.99, total: 182.78, createdAt: '2026-05-10T08:20:00Z', shippingAddress: { street: '852 Hickory Ct', city: 'Atlanta', state: 'GA', zip: '30301' }, paymentMethod: 'debit_card', trackingNumber: 'TRK10012' },
  { id: 13, userId: 12, items: [{ productId: 6, name: 'Canon EOS R6 Mark II', quantity: 1, price: 2499.99 }], status: 'processing', subtotal: 2499.99, tax: 200.00, shipping: 0, total: 2699.99, createdAt: '2026-06-13T15:30:00Z', shippingAddress: { street: '963 Poplar Dr', city: 'Dallas', state: 'TX', zip: '75201' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 14, userId: 13, items: [{ productId: 17, name: 'Sony PlayStation 5', quantity: 1, price: 449.99 }], status: 'pending', subtotal: 449.99, tax: 36.00, shipping: 0, total: 485.99, createdAt: '2026-06-13T14:00:00Z', shippingAddress: { street: '159 Sycamore Ln', city: 'Phoenix', state: 'AZ', zip: '85001' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 15, userId: 14, items: [{ productId: 22, name: 'Vitamix A3500', quantity: 1, price: 649.95 }], status: 'shipped', subtotal: 649.95, tax: 52.00, shipping: 0, total: 701.95, createdAt: '2026-06-07T11:30:00Z', shippingAddress: { street: '753 Chestnut St', city: 'San Diego', state: 'CA', zip: '92101' }, paymentMethod: 'paypal', trackingNumber: 'TRK10015' },
  { id: 16, userId: 15, items: [{ productId: 24, name: 'Lululemon Align Pant', quantity: 2, price: 98.00 }], status: 'delivered', subtotal: 196.00, tax: 15.68, shipping: 7.99, total: 219.67, createdAt: '2026-04-12T09:45:00Z', shippingAddress: { street: '951 Dogwood Way', city: 'Philadelphia', state: 'PA', zip: '19101' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10016' },
  { id: 17, userId: 16, items: [{ productId: 26, name: 'Garmin Fenix 7X', quantity: 1, price: 899.99 }], status: 'processing', subtotal: 899.99, tax: 72.00, shipping: 0, total: 971.99, createdAt: '2026-06-12T07:30:00Z', shippingAddress: { street: '357 Magnolia Ave', city: 'Charlotte', state: 'NC', zip: '28201' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 18, userId: 17, items: [{ productId: 18, name: 'Columbia Bugaboo II', quantity: 1, price: 160.00 }], status: 'shipped', subtotal: 160.00, tax: 12.80, shipping: 12.99, total: 185.79, createdAt: '2026-06-09T14:00:00Z', shippingAddress: { street: '486 Redwood Dr', city: 'San Antonio', state: 'TX', zip: '78201' }, paymentMethod: 'debit_card', trackingNumber: 'TRK10018' },
  { id: 19, userId: 18, items: [{ productId: 12, name: 'iRobot Roomba j9+', quantity: 1, price: 899.99 }], status: 'pending', subtotal: 899.99, tax: 72.00, shipping: 0, total: 971.99, createdAt: '2026-06-13T16:00:00Z', shippingAddress: { street: '294 Sequoia Ln', city: 'Columbus', state: 'OH', zip: '43201' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 20, userId: 19, items: [{ productId: 27, name: "Arc'teryx Beta LT", quantity: 1, price: 399.00 }], status: 'delivered', subtotal: 399.00, tax: 31.92, shipping: 0, total: 430.92, createdAt: '2026-05-28T12:30:00Z', shippingAddress: { street: '168 Cypress Way', city: 'Indianapolis', state: 'IN', zip: '46201' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10020' },
  { id: 21, userId: 20, items: [{ productId: 23, name: 'Bose SoundLink Max', quantity: 1, price: 399.00 }], status: 'shipped', subtotal: 399.00, tax: 31.92, shipping: 0, total: 430.92, createdAt: '2026-06-06T10:00:00Z', shippingAddress: { street: '579 Palm St', city: 'San Jose', state: 'CA', zip: '95101' }, paymentMethod: 'credit_card', trackingNumber: 'TRK10021' },
  { id: 22, userId: 21, items: [{ productId: 25, name: 'Ninja Foodi Air Fryer', quantity: 1, price: 119.99 }], status: 'delivered', subtotal: 119.99, tax: 9.60, shipping: 8.99, total: 138.58, createdAt: '2026-05-08T13:15:00Z', shippingAddress: { street: '681 Willow Way', city: 'Jacksonville', state: 'FL', zip: '32201' }, paymentMethod: 'paypal', trackingNumber: 'TRK10022' },
  { id: 23, userId: 23, items: [{ productId: 19, name: 'Instant Pot Duo 7-in-1', quantity: 2, price: 89.95 }], status: 'canceled', subtotal: 179.90, tax: 14.39, shipping: 8.99, total: 203.28, createdAt: '2026-06-02T11:45:00Z', shippingAddress: { street: '923 Juniper Ct', city: 'Charlotte', state: 'NC', zip: '28202' }, paymentMethod: 'debit_card', trackingNumber: null },
  { id: 24, userId: 24, items: [{ productId: 29, name: 'All-Clad D5 Stainless Set', quantity: 1, price: 699.95 }], status: 'processing', subtotal: 699.95, tax: 56.00, shipping: 0, total: 755.95, createdAt: '2026-06-13T12:00:00Z', shippingAddress: { street: '415 Ivy Ln', city: 'San Francisco', state: 'CA', zip: '94102' }, paymentMethod: 'credit_card', trackingNumber: null },
  { id: 25, userId: 25, items: [{ productId: 1, name: 'MacBook Pro 16"', quantity: 1, price: 2499.99 }], status: 'pending', subtotal: 2499.99, tax: 200.00, shipping: 0, total: 2699.99, createdAt: '2026-06-13T15:00:00Z', shippingAddress: { street: '737 Cherry St', city: 'New York', state: 'NY', zip: '10001' }, paymentMethod: 'credit_card', trackingNumber: null }
];
let nextId = 26;

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, userId, status } = req.query;
  let filtered = [...orders];
  if (userId) filtered = filtered.filter(o => o.userId === parseInt(userId));
  if (status) filtered = filtered.filter(o => o.status === status);
  const start = (page - 1) * limit;
  res.json({ orders: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/stats', (req, res) => {
  const statusCounts = {};
  orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  res.json({ total: orders.length, totalRevenue: orders.filter(o => o.status !== 'canceled').reduce((s, o) => s + o.total, 0).toFixed(2), byStatus: statusCounts });
});

router.get('/stats/revenue', (req, res) => {
  res.json({ totalRevenue: orders.filter(o => o.status !== 'canceled').reduce((s, o) => s + o.total, 0).toFixed(2), averageOrderValue: (orders.filter(o => o.status !== 'canceled').reduce((s, o) => s + o.total, 0) / orders.length).toFixed(2), totalOrders: orders.length });
});

router.get('/stats/products', (req, res) => {
  const productSales = {};
  orders.forEach(o => o.items.forEach(item => { productSales[item.name] = (productSales[item.name] || 0) + item.quantity; }));
  res.json({ products: Object.entries(productSales).map(([name, quantity]) => ({ name, quantity })).sort((a, b) => b.quantity - a.quantity) });
});

router.get('/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  res.json({ orders: [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit) });
});

router.get('/pending', (req, res) => {
  res.json({ orders: orders.filter(o => o.status === 'pending') });
});

router.get('/status/:status', (req, res) => {
  const results = orders.filter(o => o.status === req.params.status);
  res.json({ status: req.params.status, count: results.length, orders: results });
});

router.get('/date-range', (req, res) => {
  const { start, end } = req.query;
  const startDate = start ? new Date(start) : new Date(0);
  const endDate = end ? new Date(end) : new Date();
  const filtered = orders.filter(o => { const d = new Date(o.createdAt); return d >= startDate && d <= endDate; });
  res.json({ count: filtered.length, orders: filtered });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  const query = q.toLowerCase();
  const results = orders.filter(o => o.trackingNumber?.toLowerCase().includes(query) || o.id.toString().includes(query) || o.items.some(i => i.name.toLowerCase().includes(query)));
  res.json({ query: q, count: results.length, orders: results });
});

router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  res.json({ userId: parseInt(req.params.userId), count: userOrders.length, orders: userOrders });
});

router.post('/', (req, res) => {
  const order = { id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1, status: 'pending', createdAt: new Date().toISOString(), ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

router.post('/bulk', (req, res) => {
  const created = [];
  for (const data of (req.body.orders || [])) {
    const order = { id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1, status: 'pending', createdAt: new Date().toISOString(), ...data };
    orders.push(order);
    created.push(order);
  }
  res.status(201).json({ count: created.length, orders: created });
});

// --- Parameterized routes LAST ---

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

router.get('/:id/items', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, items: order.items });
});

router.get('/:id/status', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, status: order.status, history: [{ status: 'pending', timestamp: order.createdAt }, { status: order.status, timestamp: new Date().toISOString() }] });
});

router.get('/:id/tracking', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, trackingNumber: order.trackingNumber, status: order.status, estimatedDelivery: order.status === 'delivered' ? order.createdAt : new Date(Date.now() + 3 * 86400000).toISOString() });
});

router.get('/:id/invoice', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, invoiceNumber: `INV-${String(order.id).padStart(6, '0')}`, subtotal: order.subtotal, tax: order.tax, shipping: order.shipping, total: order.total, createdAt: order.createdAt });
});

router.put('/:id', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  orders[idx] = { ...orders[idx], ...req.body, id: orders[idx].id };
  res.json(orders[idx]);
});

router.patch('/:id/status', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  if (!req.body.status) return res.status(400).json({ error: 'status required' });
  orders[idx].status = req.body.status;
  res.json(orders[idx]);
});

router.patch('/:id/cancel', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  orders[idx].status = 'canceled';
  res.json(orders[idx]);
});

router.post('/:id/return', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'returned';
  res.json({ orderId: order.id, status: 'returned', refund: order.total });
});

router.post('/:id/discount', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { code } = req.body;
  const discount = code === 'SAVE10' ? 0.1 : code === 'SAVE20' ? 0.2 : 0;
  const discountAmount = order.subtotal * discount;
  res.json({ orderId: order.id, code, discount: `${discount * 100}%`, discountAmount: discountAmount.toFixed(2), newTotal: (order.total - discountAmount).toFixed(2) });
});

router.get('/:id/timeline', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, timeline: [{ status: 'created', timestamp: order.createdAt }, { status: order.status, timestamp: new Date().toISOString() }] });
});

router.get('/:id/notes', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ orderId: order.id, notes: [{ id: 1, text: 'Order received', author: 'system', timestamp: order.createdAt }] });
});

router.post('/:id/notes', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.status(201).json({ id: Date.now(), orderId: order.id, text: req.body.text, author: 'user', timestamp: new Date().toISOString() });
});

module.exports = router;
