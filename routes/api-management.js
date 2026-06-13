const express = require('express');
const router = express.Router();

// Mock API keys
let apiKeys = [
  { id: 1, name: 'Production Key', key: 'sk_live_abc123xyz789', createdAt: new Date().toISOString(), lastUsed: null, rateLimit: 1000 },
  { id: 2, name: 'Development Key', key: 'sk_test_def456uvw012', createdAt: new Date(Date.now() - 86400000).toISOString(), lastUsed: new Date().toISOString(), rateLimit: 100 }
];
let nextKeyId = 3;

// API Key CRUD (6 endpoints)
router.get('/', (req, res) => {
  const keys = apiKeys.map(k => ({ id: k.id, name: k.name, key: k.key.substring(0, 8) + '...', createdAt: k.createdAt, lastUsed: k.lastUsed, rateLimit: k.rateLimit }));
  res.json({ keys });
});

router.get('/:id', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API Key not found' });
  res.json({ id: key.id, name: key.name, key: key.key.substring(0, 8) + '...', createdAt: key.createdAt, lastUsed: key.lastUsed, rateLimit: key.rateLimit });
});

router.post('/', (req, res) => {
  const { name, rateLimit = 100 } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  
  const newKey = {
    id: nextKeyId++,
    name,
    key: `sk_${Math.random().toString(36).substr(2, 15)}${Date.now()}`,
    createdAt: new Date().toISOString(),
    lastUsed: null,
    rateLimit
  };
  apiKeys.push(newKey);
  
  res.status(201).json(newKey);
});

router.delete('/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API Key not found' });
  const deleted = apiKeys.splice(idx, 1);
  res.json(deleted[0]);
});

router.patch('/:id/rename', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API Key not found' });
  if (!req.body.name) return res.status(400).json({ error: 'New name required' });
  
  apiKeys[idx].name = req.body.name;
  res.json(apiKeys[idx]);
});

router.post('/:id/regenerate', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API Key not found' });
  
  apiKeys[idx].key = `sk_${Math.random().toString(36).substr(2, 15)}${Date.now()}`;
  res.json(apiKeys[idx]);
});

// Validate API key (1 endpoint)
router.post('/validate', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'API Key required' });
  
  const validKey = apiKeys.find(k => k.key === key);
  if (!validKey) return res.status(401).json({ valid: false, error: 'Invalid API Key' });
  
  validKey.lastUsed = new Date().toISOString();
  res.json({ 
    valid: true,
    name: validKey.name,
    rateLimit: validKey.rateLimit,
    lastUsed: validKey.lastUsed
  });
});

// Usage analytics (4 endpoints)
router.get('/analytics/:keyId', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.keyId));
  if (!key) return res.status(404).json({ error: 'API Key not found' });
  
  res.json({
    apiKey: key.name,
    totalRequests: Math.floor(Math.random() * 10000),
    requestsToday: Math.floor(Math.random() * 500),
    requestsThisWeek: Math.floor(Math.random() * 3000),
    averageLatency: Math.floor(Math.random() * 200) + 50,
    errorRate: (Math.random() * 2).toFixed(2)
  });
});

router.get('/analytics/:keyId/hourly', (req, res) => {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    data.push({ hour: i, requests: Math.floor(Math.random() * 100) });
  }
  res.json({ keyId: req.params.keyId, hourlyData: data });
});

router.get('/analytics/:keyId/daily', (req, res) => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({ 
      date: date.toISOString().split('T')[0], 
      requests: Math.floor(Math.random() * 1000) 
    });
  }
  res.json({ keyId: req.params.keyId, dailyData: data });
});

router.get('/analytics/summary', (req, res) => {
  const totalKeys = apiKeys.length;
  const activeKeys = apiKeys.filter(k => k.lastUsed).length;
  const totalRequests = apiKeys.reduce((sum, k) => sum + Math.floor(Math.random() * 10000), 0);
  
  res.json({ totalKeys, activeKeys, totalRequests, averageUsage: totalRequests / totalKeys || 0 });
});

// Rate limits (3 endpoints)
router.get('/:id/limits', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API Key not found' });
  
  res.json({
    apiKeyId: key.id,
    rateLimit: key.rateLimit,
    currentUsage: Math.floor(Math.random() * key.rateLimit),
    resetTime: new Date(Date.now() + 3600000).toISOString(),
    remainingRequests: Math.max(0, key.rateLimit - Math.floor(Math.random() * key.rateLimit))
  });
});

router.put('/:id/limits', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API Key not found' });
  if (!req.body.rateLimit) return res.status(400).json({ error: 'Rate limit required' });
  
  apiKeys[idx].rateLimit = req.body.rateLimit;
  res.json(apiKeys[idx]);
});

router.post('/limits/bulk-update', (req, res) => {
  const updates = req.body.updates || [];
  let count = 0;
  
  for (const update of updates) {
    const idx = apiKeys.findIndex(k => k.id === update.id);
    if (idx !== -1 && update.rateLimit) {
      apiKeys[idx].rateLimit = update.rateLimit;
      count++;
    }
  }
  
  res.json({ updated: count });
});

// Usage logs (4 endpoints)
router.get('/logs/:keyId', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.keyId));
  if (!key) return res.status(404).json({ error: 'API Key not found' });
  
  const logs = [];
  for (let i = 0; i < 10; i++) {
    logs.push({
      id: `log_${i}`,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      endpoint: `/api/v1/${['users', 'products', 'orders'][Math.floor(Math.random() * 3)]}`,
      method: ['GET', 'POST', 'PUT'][Math.floor(Math.random() * 3)],
      status: [200, 200, 400, 500][Math.floor(Math.random() * 4)],
      responseTime: Math.floor(Math.random() * 300) + 50
    });
  }
  
  res.json({ keyId: req.params.keyId, logs });
});

router.get('/logs/:keyId/errors', (req, res) => {
  const logs = [];
  for (let i = 0; i < 5; i++) {
    logs.push({
      id: `error_${i}`,
      timestamp: new Date(Date.now() - i * 7200000).toISOString(),
      endpoint: `/api/v1/${['users', 'products', 'orders'][Math.floor(Math.random() * 3)]}`,
      error: ['Rate limit exceeded', 'Authentication failed', 'Invalid request', 'Internal error'][i],
      status: [429, 401, 400, 500][i]
    });
  }
  
  res.json({ keyId: req.params.keyId, errors: logs });
});

router.get('/logs/search', (req, res) => {
  const { startDate, endDate, minStatus } = req.query;
  
  let logs = [];
  for (let i = 0; i < 20; i++) {
    logs.push({
      id: `log_${i}`,
      timestamp: new Date(Date.now() - i * 1800000).toISOString(),
      endpoint: `/api/v1/${['users', 'products', 'orders', 'auth'][Math.floor(Math.random() * 4)]}`,
      method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
      status: [200, 200, 201, 400, 404, 500][Math.floor(Math.random() * 6)],
      responseTime: Math.floor(Math.random() * 300) + 50
    });
  }
  
  if (minStatus) {
    logs = logs.filter(l => l.status >= parseInt(minStatus));
  }
  
  res.json({ total: logs.length, logs });
});

router.post('/logs/export', (req, res) => {
  const { keyId, startDate, endDate } = req.body;
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="api-logs-${keyId || 'all'}-${Date.now()}.json"`);
  
  res.json({ 
    exportedAt: new Date().toISOString(),
    logs: [],
  });
});

// Quota management (2 endpoints)
router.get('/:id/quota', (req, res) => {
  const key = apiKeys.find(k => k.id === parseInt(req.params.id));
  if (!key) return res.status(404).json({ error: 'API Key not found' });
  
  const used = Math.floor(Math.random() * key.rateLimit);
  res.json({
    apiKeyId: key.id,
    limit: key.rateLimit,
    used,
    remaining: key.rateLimit - used,
    percentageUsed: ((used / key.rateLimit) * 100).toFixed(2),
    resetAt: new Date(Date.now() + 3600000).toISOString()
  });
});

router.post('/quota/extend/:id', (req, res) => {
  const idx = apiKeys.findIndex(k => k.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'API Key not found' });
  
  apiKeys[idx].rateLimit += 1000;
  
  const updatedKey = apiKeys[idx];
  res.json({ 
    message: 'Quota extended',
    newLimit: updatedKey.rateLimit,
    addedAmount: 1000
  });
});

module.exports = router;
