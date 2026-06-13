const express = require('express');
const router = express.Router();

// Mock data
let orders = [
  { id: 1, userId: 1, items: [{ productId: 1, quantity: 2 }], status: 'shipped', total: 1999.98, createdAt: new Date().toISOString(), shippingAddress: { address: '123 Main St', city: 'SF', zip: '94105' } },
  { id: 2, userId: 1, items: [{ productId: 2, quantity: 1 }], status: 'delivered', total: 199.99, createdAt: new Date(Date.now() - 86400000).toISOString(), shippingAddress: { address: '123 Main St', city: 'SF', zip: '94105' } }
];
let nextId = 3;
let carts = {};

// Order CRUD (5 endpoints)
router.get('/', (req, res) => {
  const { page = 1, limit = 10, userId, status } = req.query;
  let filtered = [...orders];
  if (userId) filtered = filtered.filter(o => o.userId === parseInt(userId));
  if (status) filtered = filtered.filter(o => o.status === status);
  const start = (page - 1) * limit;
  res.json({ 
    orders: filtered.slice(start, start + parseInt(limit)),
    total: filtered.length, page: parseInt(page),
    totalPages: Math.ceil(filtered.length / limit)
  });
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

router.post('/', (req, res) => {
  const newOrder = { id: nextId++, ...req.body, createdAt: new Date().toISOString() };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.patch('/:id/status', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  if (!req.body.status) return res.status(400).json({ error: 'Status required' });
  orders[idx].status = req.body.status;
  res.json(orders[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  const deleted = orders.splice(idx, 1);
  res.json(deleted[0]);
});

// Cart endpoints (7 endpoints)
router.get('/cart', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const cart = carts[userId] || { items: [], total: 0 };
  res.json(cart);
});

router.post('/cart', (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) return res.status(400).json({ error: 'Missing fields' });
  let cart = carts[userId] || { items: [] };
  const existingIdx = cart.items.findIndex(i => i.productId === productId);
  if (existingIdx > -1) cart.items[existingIdx].quantity += quantity;
  else cart.items.push({ productId, quantity });
  cart.total = cart.items.reduce((sum, i) => sum + i.productId * i.quantity, 0);
  carts[userId] = cart;
  res.status(201).json(cart);
});

router.put('/cart', (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !items) return res.status(400).json({ error: 'Missing fields' });
  carts[userId] = { items, total: items.reduce((sum, i) => sum + i.productId * i.quantity, 0) };
  res.json(carts[userId]);
});

router.patch('/cart/:productId/quantity', (req, res) => {
  const userId = req.query.userId;
  const { quantity } = req.body;
  if (!userId || !quantity) return res.status(400).json({ error: 'Missing fields' });
  let cart = carts[userId] || { items: [] };
  const idx = cart.items.findIndex(i => i.productId === parseInt(req.params.productId));
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  if (quantity <= 0) cart.items.splice(idx, 1); else cart.items[idx].quantity = quantity;
  carts[userId] = cart;
  res.json(cart);
});

router.delete('/cart/:productId', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  if (!carts[userId]) return res.status(404).json({ error: 'Cart not found' });
  carts[userId].items = carts[userId].items.filter(i => i.productId !== parseInt(req.params.productId));
  res.json(carts[userId]);
});

router.delete('/cart', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  carts[userId] = { items: [], total: 0 };
  res.json(carts[userId]);
});

router.post('/cart/apply-coupon', (req, res) => {
  const { userId, coupon } = req.body;
  if (!userId || !coupon) return res.status(400).json({ error: 'Missing fields' });
  let cart = carts[userId] || { items: [], total: 0 };
  const discountMap = { SAVE10: 0.1, SAVE20: 0.2, HALF: 0.5 };
  if (discountMap[coupon]) {
    cart.discount = discountMap[coupon];
    cart.totalWithDiscount = cart.total * (1 - discountMap[coupon]);
  }
  carts[userId] = cart;
  res.json(cart);
});

// Checkout (4 endpoints)
router.post('/checkout', (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;
  if (!userId || !shippingAddress || !paymentMethod) return res.status(400).json({ error: 'Missing fields' });
  const cart = carts[userId];
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  
  const order = {
    id: nextId++,
    userId,
    items: cart.items,
    status: 'pending',
    total: cart.totalWithDiscount || cart.total,
    createdAt: new Date().toISOString(),
    shippingAddress, paymentMethod
  };
  orders.push(order);
  carts[userId] = { items: [], total: 0 };
  
  res.status(201).json(order);
});

router.post('/checkout/preview', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const cart = carts[userId] || { items: [], total: 0 };
  res.json({ 
    preview: true,
    itemCount: cart.items.length,
    subtotal: cart.total,
    tax: cart.total * 0.08,
    shipping: 9.99,
    estimatedTotal: cart.total * 1.08 + 9.99
  });
});

router.post('/checkout/guest', (req, res) => {
  const { email, items, shippingAddress } = req.body;
  if (!email || !items || !shippingAddress) return res.status(400).json({ error: 'Missing fields' });
  
  const order = {
    id: nextId++,
    userId: null,
    guestEmail: email,
    items,
    status: 'pending',
    total: items.reduce((sum, i) => sum + i.productId * i.quantity, 0),
    createdAt: new Date().toISOString(),
    shippingAddress
  };
  orders.push(order);
  res.status(201).json(order);
});

router.post('/checkout/payment/intent', (req, res) => {
  const { amount, currency = 'USD' } = req.body;
  if (!amount) return res.status(400).json({ error: 'Amount required' });
  
  res.json({
    paymentIntentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2)}`,
    amount, currency,
    status: 'requires_payment_method',
    clientSecret: `secret_${Date.now()}`
  });
});

// Order history (4 endpoints)
router.get('/history/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  res.json({ userId: req.params.userId, count: userOrders.length, orders: userOrders });
});

router.get('/history/:userId/past/:period', (req, res) => {
  let periodMs;
  switch(req.params.period) {
    case 'week': periodMs = 7 * 86400000; break;
    case 'month': periodMs = 30 * 86400000; break;
    case 'year': periodMs = 365 * 86400000; break;
    default: return res.status(400).json({ error: 'Invalid period' });
  }
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  const cutoff = new Date(Date.now() - periodMs);
  const recentOrders = userOrders.filter(o => new Date(o.createdAt) >= cutoff);
  res.json({ userId: req.params.userId, period: req.params.period, orders: recentOrders });
});

router.get('/stats/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
  res.json({ 
    userId: req.params.userId,
    totalOrders: userOrders.length,
    totalSpent,
    averageOrderValue: userOrders.length ? totalSpent / userOrders.length : 0
  });
});

router.post('/reorder/:orderId', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.orderId));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  
  carts[userId] = { items: order.items.map(i => ({ ...i})), total: order.total };
  res.json(carts[userId]);
});

// Tracking (2 endpoints)
router.get('/:id/track', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ 
    orderId: order.id,
    trackingNumber: `TRK${1000 + order.id}`,
    status: order.status,
    estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString()
  });
});

router.get('/track/number/:trackingNumber', (req, res) => {
  const orderId = parseInt(req.params.trackingNumber.replace('TRK', '')) - 1000;
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  res.json({ 
    trackingNumber: req.params.trackingNumber,
    status: order.status,
    history: [
      { status: 'Order placed', date: order.createdAt },
      { status: 'Processing', date: new Date(Date.now() - 86400000).toISOString() },
      { status: 'Shipped', date: new Date().toISOString() }
    ]
  });
});

// Cancel (1 endpoint)
router.post('/cancel/:id', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  
  const order = orders[idx];
  if (!['pending', 'processing'].includes(order.status)) {
    return res.status(400).json({ error: 'Cannot cancel this order' });
  }
  
  order.status = 'canceled';
  res.json(order);
});

// Order status list (1 endpoint)
router.get('/status/list', (req, res) => {
  res.json(['pending', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'canceled']);
});

module.exports = router;
