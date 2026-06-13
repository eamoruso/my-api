const express = require('express');
const router = express.Router();

let apiKeys = [
  { id: 1, name: 'Production API Key', key: 'sk_live_a1b2c3d4e5f6g7h8i9j0', createdAt: '2024-01-15T08:00:00Z', lastUsed: '2026-06-13T10:22:00Z', rateLimit: 1000, status: 'active' },
  { id: 2, name: 'Staging API Key', key: 'sk_test_k1l2m3n4o5p6q7r8s9t0', createdAt: '2024-02-20T09:15:00Z', lastUsed: '2026-06-12T14:30:00Z', rateLimit: 500, status: 'active' },
  { id: 3, name: 'Development Key', key: 'sk_dev_u1v2w3x4y5z6a7b8c9d0', createdAt: '2024-03-10T11:00:00Z', lastUsed: '2026-06-11T09:45:00Z', rateLimit: 100, status: 'active' },
  { id: 4, name: 'Testing Key', key: 'sk_test_e1f2g3h4i5j6k7l8m9n0', createdAt: '2024-04-12T13:20:00Z', lastUsed: '2026-06-10T16:15:00Z', rateLimit: 200, status: 'active' },
  { id: 5, name: 'Partner Key - Acme', key: 'sk_live_o1p2q3r4s5t6u7v8w9x0', createdAt: '2024-05-01T10:45:00Z', lastUsed: '2026-06-13T11:00:00Z', rateLimit: 2000, status: 'active' },
  { id: 6, name: 'Partner Key - Globex', key: 'sk_live_y1z2a3b4c5d6e7f8g9h0', createdAt: '2024-06-18T14:30:00Z', lastUsed: '2026-06-09T08:30:00Z', rateLimit: 1500, status: 'active' },
  { id: 7, name: 'Legacy Key (Deprecated)', key: 'sk_old_i1j2k3l4m5n6o7p8q9r0', createdAt: '2023-01-01T00:00:00Z', lastUsed: '2025-12-31T23:59:59Z', rateLimit: 50, status: 'deprecated' },
  { id: 8, name: 'Revoked Key', key: 'sk_rev_s1t2u3v4w5x6y7z8a9b0', createdAt: '2024-07-22T09:00:00Z', lastUsed: null, rateLimit: 0, status: 'revoked' },
  { id: 9, name: 'Mobile App Key', key: 'sk_live_c1d2e3f4g5h6i7j8k9l0', createdAt: '2024-08-30T16:00:00Z', lastUsed: '2026-06-13T12:45:00Z', rateLimit: 800, status: 'active' },
  { id: 10, name: 'Webhook Key', key: 'sk_live_m1n2o3p4q5r6s7t8u9v0', createdAt: '2024-09-14T12:10:00Z', lastUsed: '2026-06-13T09:30:00Z', rateLimit: 300, status: 'active' }
];
let nextId = 11;

const logs = [];
for (let i = 0; i < 20; i++) {
  logs.push({ id: `log_${i}`, timestamp: new Date(Date.now() - i * 1800000).toISOString(), endpoint: `/api/v1/${['users', 'products', 'orders', 'auth'][i % 4]}`, method: ['GET', 'POST', 'PUT', 'DELETE'][i % 4], status: [200, 200, 201, 400, 404][i % 5], responseTime: Math.floor(Math.random() * 300) + 50 });
}

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const keys = apiKeys.map(k => ({ id: k.id, name: k.name, key: k.key.substring(0, 12) + '...', createdAt: k.createdAt, lastUsed: k.lastUsed, rateLimit: k.rateLimit, status: k.status }));
  res.json({ count: keys.length, keys });
});

router.get('/usage', (req, res) => {
  res.json({ totalRequests: 156789, requestsToday: 1234, averageLatency: 45, errorRate: 1.2, topEndpoints: [{ endpoint: '/api/v1/users', requests: 45000 }, { endpoint: '/api/v1/products', requests: 38000 }, { endpoint: '/api/v1/orders', requests: 28000 }] });
});

router.get('/stats', (req, res) => {
  const active = apiKeys.filter(k => k.status === 'active').length;
  const revoked = apiKeys.filter(k => k.status === 'revoked').length;
  const deprecated = apiKeys.filter(k => k.status === 'deprecated').length;
  res.json({ totalKeys: apiKeys.length, active, revoked, deprecated, totalRequests: 156789, averageRateLimit: Math.round(apiKeys.reduce((s, k) => s + k.rateLimit, 0) / apiKeys.length) });
});

router.get('/keys', (req, res) => {
  const keys = apiKeys.map(k => ({ id: k.id, name: k.name, key: k.key.substring(0, 12) + '...', createdAt: k.createdAt, lastUsed: k.lastUsed, rateLimit: k.rateLimit, status: k.status }));
  res.json({ count: keys.length, keys });
});

router.post('/keys', (req, res) => {
  const { name, rateLimit = 100 } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const newKey = { id: nextId++, name, key: `sk_${Math.random().toString(36).substr(2, 15)}`, createdAt: new Date().toISOString(), lastUsed: null, rateLimit, status: 'active' };
  apiKeys.push(newKey);
  res.status(201).json(newKey);
});

router.get('/rate-limits', (req, res) => {
  res.json({ defaultRateLimit: 100, tiers: [{ name: 'free', limit: 100, window: '15min' }, { name: 'pro', limit: 1000, window: '15min' }, { name: 'enterprise', limit: 10000, window: '15min' }] });
});

router.get('/logs', (req, res) => {
  res.json({ total: logs.length, logs });
});

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime(), lastCheck: new Date().toISOString(), services: { api: 'up', database: 'up', cache: 'up' } });
});

router.get('/errors', (req, res) => {
  const errors = logs.filter(l => l.status >= 400);
  res.json({ total: errors.length, errors: errors.slice(0, 10) });
});

router.get('/performance', (req, res) => {
  res.json({ averageLatency: 45, p50: 30, p90: 80, p99: 200, requestsPerSecond: 42, errorRate: 1.2 });
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/usage/:keyId', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.keyId));
  if (!key) return res.status(404).json({ error: 'API key not found' });
  res.json({ keyId: key.id, name: key.name, totalRequests: Math.floor(Math.random() * 50000), requestsToday: Math.floor(Math.random() * 1000), averageLatency: Math.floor(Math.random() * 200) + 50 });
});

router.get('/usage/:keyId/daily', (req, res) => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(); date.setDate(date.getDate() - i);
    data.push({ date: date.toISOString().split('T')[0], requests: Math.floor(Math.random() * 5000) + 100, errors: Math.floor(Math.random() * 50) });
  }
  res.json({ keyId: parseInt(req.params.keyId), dailyData: data });
});

router.get('/usage/:keyId/endpoints', (req, res) => {
  res.json({ keyId: parseInt(req.params.keyId), endpoints: [
    { endpoint: '/api/v1/users', requests: 1200, avgLatency: 45 },
    { endpoint: '/api/v1/products', requests: 980, avgLatency: 38 },
    { endpoint: '/api/v1/orders', requests: 750, avgLatency: 52 }
  ]});
});

router.post('/usage/:keyId/reset', (req, res) => {
  res.json({ keyId: parseInt(req.params.keyId), message: 'Usage counters reset', resetAt: new Date().toISOString() });
});

router.get('/logs/:id', (req, res) => {
  const log = logs.find(l => l.id === req.params.id);
  if (!log) return res.status(404).json({ error: 'Log not found' });
  res.json(log);
});

router.get('/keys/:id', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API key not found' });
  res.json({ id: key.id, name: key.name, key: key.key.substring(0, 12) + '...', createdAt: key.createdAt, lastUsed: key.lastUsed, rateLimit: key.rateLimit, status: key.status });
});

router.put('/keys/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx] = { ...apiKeys[idx], ...req.body, id: apiKeys[idx].id };
  res.json(apiKeys[idx]);
});

router.patch('/keys/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  Object.assign(apiKeys[idx], req.body);
  res.json(apiKeys[idx]);
});

router.delete('/keys/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].status = 'revoked';
  res.json(apiKeys[idx]);
});

router.post('/keys/:id/regenerate', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].key = `sk_${Math.random().toString(36).substr(2, 15)}`;
  apiKeys[idx].lastUsed = null;
  res.json(apiKeys[idx]);
});

router.post('/keys/:id/revoke', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].status = 'revoked';
  res.json(apiKeys[idx]);
});

router.get('/keys/:id/usage', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API key not found' });
  res.json({ keyId: key.id, name: key.name, totalRequests: Math.floor(Math.random() * 10000), requestsToday: Math.floor(Math.random() * 500), averageLatency: Math.floor(Math.random() * 100) + 20, errorRate: (Math.random() * 5).toFixed(1), dailyUsage: Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0], requests: Math.floor(Math.random() * 500) })) });
});

router.get('/:id', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API key not found' });
  res.json({ id: key.id, name: key.name, key: key.key.substring(0, 12) + '...', createdAt: key.createdAt, lastUsed: key.lastUsed, rateLimit: key.rateLimit, status: key.status });
});

router.put('/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx] = { ...apiKeys[idx], ...req.body, id: apiKeys[idx].id };
  res.json(apiKeys[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  Object.assign(apiKeys[idx], req.body);
  res.json(apiKeys[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].status = 'revoked';
  res.json(apiKeys[idx]);
});

router.post('/:id/regenerate', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].key = `sk_${Math.random().toString(36).substr(2, 15)}`;
  apiKeys[idx].lastUsed = null;
  res.json(apiKeys[idx]);
});

router.post('/:id/revoke', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API key not found' });
  apiKeys[idx].status = 'revoked';
  res.json(apiKeys[idx]);
});

module.exports = router;
