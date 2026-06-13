const express = require('express');
const router = express.Router();

let users = [
  { id: 1, email: 'alice@example.com', username: 'alice', firstName: 'Alice', lastName: 'Smith', role: 'admin', department: 'engineering', createdAt: '2024-01-15T08:30:00Z', lastLogin: '2026-06-13T10:22:00Z', status: 'active' },
  { id: 2, email: 'bob@example.com', username: 'bob', firstName: 'Bob', lastName: 'Johnson', role: 'user', department: 'marketing', createdAt: '2024-02-20T09:15:00Z', lastLogin: '2026-06-12T14:30:00Z', status: 'active' },
  { id: 3, email: 'charlie@example.com', username: 'charlie', firstName: 'Charlie', lastName: 'Brown', role: 'user', department: 'sales', createdAt: '2024-03-10T11:00:00Z', lastLogin: '2026-06-11T09:45:00Z', status: 'active' },
  { id: 4, email: 'diana@example.com', username: 'diana', firstName: 'Diana', lastName: 'Prince', role: 'admin', department: 'engineering', createdAt: '2024-01-05T07:00:00Z', lastLogin: '2026-06-13T08:00:00Z', status: 'active' },
  { id: 5, email: 'edward@example.com', username: 'edward', firstName: 'Edward', lastName: 'Norton', role: 'user', department: 'support', createdAt: '2024-04-12T13:20:00Z', lastLogin: '2026-06-10T16:15:00Z', status: 'active' },
  { id: 6, email: 'fiona@example.com', username: 'fiona', firstName: 'Fiona', lastName: 'Apple', role: 'moderator', department: 'content', createdAt: '2024-05-01T10:45:00Z', lastLogin: '2026-06-13T11:00:00Z', status: 'active' },
  { id: 7, email: 'george@example.com', username: 'george', firstName: 'George', lastName: 'Lucas', role: 'user', department: 'finance', createdAt: '2024-06-18T14:30:00Z', lastLogin: '2026-06-09T08:30:00Z', status: 'active' },
  { id: 8, email: 'hannah@example.com', username: 'hannah', firstName: 'Hannah', lastName: 'Montana', role: 'user', department: 'hr', createdAt: '2024-07-22T09:00:00Z', lastLogin: '2026-06-13T12:45:00Z', status: 'active' },
  { id: 9, email: 'ivan@example.com', username: 'ivan', firstName: 'Ivan', lastName: 'Petrov', role: 'user', department: 'engineering', createdAt: '2024-08-30T16:00:00Z', lastLogin: '2026-06-08T15:20:00Z', status: 'active' },
  { id: 10, email: 'julia@example.com', username: 'julia', firstName: 'Julia', lastName: 'Roberts', role: 'moderator', department: 'marketing', createdAt: '2024-09-14T12:10:00Z', lastLogin: '2026-06-13T09:30:00Z', status: 'active' },
  { id: 11, email: 'kevin@example.com', username: 'kevin', firstName: 'Kevin', lastName: 'Hart', role: 'user', department: 'support', createdAt: '2024-10-05T08:20:00Z', lastLogin: '2026-06-07T11:45:00Z', status: 'inactive' },
  { id: 12, email: 'laura@example.com', username: 'laura', firstName: 'Laura', lastName: 'Croft', role: 'user', department: 'sales', createdAt: '2024-11-11T15:30:00Z', lastLogin: '2026-06-13T14:00:00Z', status: 'active' },
  { id: 13, email: 'michael@example.com', username: 'michael', firstName: 'Michael', lastName: 'Scott', role: 'admin', department: 'management', createdAt: '2024-01-20T07:45:00Z', lastLogin: '2026-06-13T07:30:00Z', status: 'active' },
  { id: 14, email: 'nina@example.com', username: 'nina', firstName: 'Nina', lastName: 'Dobrev', role: 'user', department: 'content', createdAt: '2025-01-08T10:00:00Z', lastLogin: '2026-06-12T13:15:00Z', status: 'active' },
  { id: 15, email: 'oscar@example.com', username: 'oscar', firstName: 'Oscar', lastName: 'Wilde', role: 'user', department: 'legal', createdAt: '2025-02-14T11:30:00Z', lastLogin: '2026-06-06T10:00:00Z', status: 'active' },
  { id: 16, email: 'patricia@example.com', username: 'patricia', firstName: 'Patricia', lastName: 'Bath', role: 'moderator', department: 'engineering', createdAt: '2025-03-22T09:15:00Z', lastLogin: '2026-06-13T15:30:00Z', status: 'active' },
  { id: 17, email: 'quinn@example.com', username: 'quinn', firstName: 'Quinn', lastName: 'Malone', role: 'user', department: 'marketing', createdAt: '2025-04-30T14:00:00Z', lastLogin: '2026-06-05T09:20:00Z', status: 'active' },
  { id: 18, email: 'rachel@example.com', username: 'rachel', firstName: 'Rachel', lastName: 'Green', role: 'user', department: 'hr', createdAt: '2025-05-18T08:45:00Z', lastLogin: '2026-06-13T16:00:00Z', status: 'active' },
  { id: 19, email: 'steve@example.com', username: 'steve', firstName: 'Steve', lastName: 'Rogers', role: 'admin', department: 'management', createdAt: '2025-06-25T12:30:00Z', lastLogin: '2026-06-12T11:00:00Z', status: 'active' },
  { id: 20, email: 'tina@example.com', username: 'tina', firstName: 'Tina', lastName: 'Turner', role: 'user', department: 'finance', createdAt: '2025-07-14T10:00:00Z', lastLogin: '2026-06-04T14:30:00Z', status: 'active' },
  { id: 21, email: 'uma@example.com', username: 'uma', firstName: 'Uma', lastName: 'Thurman', role: 'user', department: 'sales', createdAt: '2025-08-01T13:15:00Z', lastLogin: '2026-06-13T13:45:00Z', status: 'active' },
  { id: 22, email: 'victor@example.com', username: 'victor', firstName: 'Victor', lastName: 'Frankenstein', role: 'user', department: 'engineering', createdAt: '2025-09-09T07:30:00Z', lastLogin: '2026-06-03T08:15:00Z', status: 'suspended' },
  { id: 23, email: 'wendy@example.com', username: 'wendy', firstName: 'Wendy', lastName: 'Curtis', role: 'user', department: 'support', createdAt: '2025-10-20T11:45:00Z', lastLogin: '2026-06-13T10:00:00Z', status: 'active' },
  { id: 24, email: 'xavier@example.com', username: 'xavier', firstName: 'Xavier', lastName: 'Dolan', role: 'moderator', department: 'content', createdAt: '2025-11-30T15:00:00Z', lastLogin: '2026-06-12T16:30:00Z', status: 'active' },
  { id: 25, email: 'yolanda@example.com', username: 'yolanda', firstName: 'Yolanda', lastName: 'Adams', role: 'user', department: 'legal', createdAt: '2025-12-15T09:30:00Z', lastLogin: '2026-06-01T12:00:00Z', status: 'active' }
];
let nextId = 26;

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, role, department, status } = req.query;
  let filtered = [...users];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q)); }
  if (role) filtered = filtered.filter(u => u.role === role);
  if (department) filtered = filtered.filter(u => u.department === department);
  if (status) filtered = filtered.filter(u => u.status === status);
  const start = (page - 1) * limit;
  res.json({ users: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/count', (req, res) => {
  res.json({ total: users.length });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  const query = q.toLowerCase();
  const results = users.filter(u => u.username.toLowerCase().includes(query) || u.email.toLowerCase().includes(query) || u.firstName.toLowerCase().includes(query) || u.lastName.toLowerCase().includes(query));
  res.json({ query: q, count: results.length, users: results });
});

router.get('/stats', (req, res) => {
  const byRole = {};
  const byDept = {};
  users.forEach(u => { byRole[u.role] = (byRole[u.role] || 0) + 1; byDept[u.department] = (byDept[u.department] || 0) + 1; });
  res.json({ total: users.length, byRole, byDepartment: byDept });
});

router.get('/active', (req, res) => {
  const active = users.filter(u => u.status === 'active');
  res.json({ count: active.length, users: active });
});

router.get('/validate-email', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'email query param required' });
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  res.json({ email, valid });
});

router.post('/', (req, res) => {
  const { email, username, firstName, lastName, role = 'user', department = 'general' } = req.body;
  if (!email || !username) return res.status(400).json({ error: 'Email and username required' });
  const newUser = { id: nextId++, email, username, firstName, lastName, role, department, createdAt: new Date().toISOString(), lastLogin: null, status: 'active' };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.post('/bulk', (req, res) => {
  const created = [];
  for (const data of (req.body.users || [])) {
    const user = { id: nextId++, createdAt: new Date().toISOString(), lastLogin: null, status: 'active', ...data };
    users.push(user);
    created.push(user);
  }
  res.status(201).json({ count: created.length, users: created });
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/:id/profile', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, bio: `Hi, I'm ${user.firstName} ${user.lastName}`, location: 'San Francisco, CA', website: `https://${user.username}.dev`, social: { twitter: `@${user.username}`, github: user.username } });
});

router.get('/:id/orders', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, orders: [{ id: 1, total: 99.99, status: 'delivered' }, { id: 2, total: 149.99, status: 'shipped' }] });
});

router.get('/:id/preferences', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, theme: 'dark', notifications: true, language: 'en', timezone: 'America/Los_Angeles' });
});

router.put('/:id/preferences', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, ...req.body });
});

router.get('/:id/activity', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, activities: [
    { type: 'login', timestamp: '2026-06-13T10:22:00Z', ip: '192.168.1.1' },
    { type: 'view_product', timestamp: '2026-06-13T10:25:00Z', details: { productId: 5 } },
    { type: 'purchase', timestamp: '2026-06-13T10:30:00Z', details: { orderId: 12 } }
  ]});
});

router.get('/:id/permissions', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: user.id, role: user.role, permissions: ['read', 'write', user.role === 'admin' ? 'admin' : 'user'].filter(Boolean) });
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.put('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body, id: users[idx].id };
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

module.exports = router;
