const express = require('express');
const router = express.Router();

// In-memory mock database
let users = [
  { id: 1, email: 'alice@example.com', username: 'alice', firstName: 'Alice', lastName: 'Smith', createdAt: new Date().toISOString(), role: 'user' },
  { id: 2, email: 'bob@example.com', username: 'bob', firstName: 'Bob', lastName: 'Johnson', createdAt: new Date().toISOString(), role: 'admin' },
  { id: 3, email: 'charlie@example.com', username: 'charlie', firstName: 'Charlie', lastName: 'Brown', createdAt: new Date().toISOString(), role: 'user' }
];

let nextId = 4;

// CRUD operations for users (+7 endpoints)
router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, role } = req.query;
  let filtered = [...users];
  if (search) filtered = filtered.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search));
  if (role) filtered = filtered.filter(u => u.role === role);
  const start = (page - 1) * limit;
  res.json({ 
    users: filtered.slice(start, start + parseInt(limit)),
    total: filtered.length,
    page: parseInt(page),
    totalPages: Math.ceil(filtered.length / limit)
  });
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/', (req, res) => {
  const { email, username, firstName, lastName, role = 'user' } = req.body;
  if (!email || !username) return res.status(400).json({ error: 'Email and username required' });
  const newUser = { id: nextId++, email, username, firstName, lastName, createdAt: new Date().toISOString(), role };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json(users[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  Object.assign(users[idx], req.body);
  res.json(users[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(idx, 1);
  res.json(deleted[0]);
});

// User search (+3 endpoints)
router.get('/search/username/:query', (req, res) => {
  const results = users.filter(u => u.username.includes(req.params.query));
  res.json({ query: req.params.query, results });
});

router.get('/search/email/:domain', (req, res) => {
  const results = users.filter(u => u.email.endsWith(req.params.domain));
  res.json({ domain: req.params.domain, results });
});

router.post('/search/advanced', (req, res) => {
  let filtered = [...users];
  if (req.body.role) filtered = filtered.filter(u => u.role === req.body.role);
  if (req.body.emailDomain) filtered = filtered.filter(u => u.email.endsWith(req.body.emailDomain));
  if (req.body.startDate) filtered = filtered.filter(u => new Date(u.createdAt) >= new Date(req.body.startDate));
  res.json({ total: filtered.length, users: filtered });
});

// User counts (+3 endpoints)
router.get('/count', (req, res) => {
  res.json({ total: users.length, admins: users.filter(u => u.role === 'admin').length, users: users.filter(u => u.role === 'user').length });
});

router.get('/count/by-role', (req, res) => {
  const byRole = {};
  users.forEach(u => { byRole[u.role] = (byRole[u.role] || 0) + 1; });
  res.json(byRole);
});

router.get('/exists/email/:email', (req, res) => {
  const exists = users.some(u => u.email === req.params.email);
  res.json({ email: req.params.email, exists });
});

// Batch operations (+3 endpoints)
router.post('/batch/create', (req, res) => {
  const created = [];
  for (const userData of req.body.users || []) {
    created.push(users[users.push({ id: nextId++, ...userData, createdAt: new Date().toISOString() }) - 1]);
  }
  res.status(201).json(created);
});

router.post('/batch/update', (req, res) => {
  const updated = [];
  for (const item of req.body.updates || []) {
    const idx = users.findIndex(u => u.id === item.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...item.data };
      updated.push(users[idx]);
    }
  }
  res.json({ updated_count: updated.length, users: updated });
});

router.delete('/batch/delete', (req, res) => {
  const ids = req.body.ids || [];
  const deleted = [];
  for (const id of ids) {
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) deleted.push(users.splice(idx, 1)[0]);
  }
  res.json({ deleted_count: deleted.length, users: deleted });
});

// User roles (+3 endpoints)
router.get('/roles', (req, res) => {
  const roles = [...new Set(users.map(u => u.role))];
  res.json(roles);
});

router.post('/:id/assign-role', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx].role = req.body.role;
  res.json(users[idx]);
});

router.get('/roles/:role', (req, res) => {
  const results = users.filter(u => u.role === req.params.role);
  res.json(results);
});

// Export (+1 endpoint)
router.post('/export', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=users.json');
  res.json(users);
});

module.exports = router;
