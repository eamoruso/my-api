const express = require('express');
const router = express.Router();

const startTime = Date.now();

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  res.json({ name: 'Zombie APIs Research API', version: '1.0.0', status: 'operational', uptime: Math.floor((Date.now() - startTime) / 1000) });
});

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

router.get('/info', (req, res) => {
  res.json({ name: 'Zombie APIs Research API', version: '1.0.0', apiVersion: 'v1', buildDate: '2026-06-13', nodeVersion: process.version, platform: process.platform, architecture: process.arch });
});

router.get('/status', (req, res) => {
  res.json({ status: 'operational', components: { api: 'up', database: 'up', cache: 'up' }, uptime: Math.floor((Date.now() - startTime) / 1000) });
});

router.get('/stats', (req, res) => {
  res.json({ uptime: process.uptime(), memoryUsage: process.memoryUsage(), cpuUsage: process.cpuUsage(), requestsHandled: global.requestCount || 0, activeConnections: 1 });
});

router.get('/uptime', (req, res) => {
  res.json({ uptime: process.uptime(), startedAt: new Date(startTime).toISOString(), now: new Date().toISOString() });
});

router.get('/time', (req, res) => {
  res.json({ utc: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, timestamp: Date.now() });
});

router.get('/ping', (req, res) => {
  res.json({ pong: true, timestamp: Date.now() });
});

router.get('/config', (req, res) => {
  res.json({ environment: process.env.NODE_ENV || 'development', features: { rateLimiting: true, cors: true, swaggerEnabled: true }, limits: { maxUploadSize: '10mb', rateLimit: 100 } });
});

router.get('/features', (req, res) => {
  res.json({ features: [{ name: 'rate-limiting', enabled: true }, { name: 'cors', enabled: true }, { name: 'swagger', enabled: true }, { name: 'auth', enabled: true }, { name: 'caching', enabled: false }] });
});

module.exports = router;
