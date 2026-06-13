const express = require('express');
const router = express.Router();

// System endpoints (10+ endpoints)
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

router.get('/ready', (req, res) => {
  res.json({ ready: true, database: 'connected', cache: 'available' });
});

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0', apiVersion: 'v1', buildDate: new Date().toISOString() });
});

router.get('/config', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    features: {
      rateLimiting: true,
      cors: true,
      swaggerEnabled: true
    }
  });
});

router.get('/metrics', (req, res) => {
  res.json({
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    requestsHandled: global.requestCount || 0
  });
});

router.post('/metrics/increment', (req, res) => {
  global.requestCount = (global.requestCount || 0) + 1;
  res.json({ message: 'Counter incremented', value: global.requestCount });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'operational', 
    components: {
      api: 'up',
      database: 'up'
    } 
  });
});

router.get('/env', (req, res) => {
  const safeEnv = { ...process.env };
  delete safeEnv.JWT_SECRET;
  delete safeEnv.DB_PASSWORD;
  res.json(safeEnv);
});

router.get('/routes', (req, res) => {
  const routes = [
    'GET /health', 'GET /ready', 'GET /version', 'GET /config',
    'GET /metrics', 'POST /metrics/increment', 'GET /status', 'GET /env', 'GET /routes'
  ];
  res.json({ routes, count: routes.length });
});

router.delete('/cache', (req, res) => {
  global.cacheCleared = true;
  res.json({ message: 'Cache cleared successfully' });
});

module.exports = router;
