const express = require('express');
const router = express.Router();

let authToken = null;
let sessions = [
  { id: 1, device: 'Chrome on macOS', ip: '192.168.1.1', lastActive: new Date().toISOString(), current: true },
  { id: 2, device: 'Safari on iOS', ip: '10.0.0.1', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false }
];
let tokens = [
  { id: 1, name: 'Mobile App Token', token: 'tok_abc123', createdAt: '2026-06-01T00:00:00Z', expiresAt: '2026-12-01T00:00:00Z', status: 'active' },
  { id: 2, name: 'CI/CD Token', token: 'tok_def456', createdAt: '2026-05-15T00:00:00Z', expiresAt: '2026-08-15T00:00:00Z', status: 'active' }
];

// --- Static routes FIRST ---

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  res.json({ access_token: authToken, token_type: 'Bearer', expires_in: 3600, user: { email, username: email.split('@')[0] } });
});

router.post('/logout', (req, res) => { authToken = null; res.json({ message: 'Logged out successfully' }); });

router.post('/refresh', (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(400).json({ error: 'refresh_token required' });
  res.json({ access_token: `new_token_${Date.now()}`, token_type: 'Bearer', expires_in: 3600 });
});

router.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) return res.status(400).json({ error: 'All fields required' });
  res.status(201).json({ message: 'User registered', user: { email, username }, access_token: `token_${Date.now()}` });
});

router.post('/forgot-password', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'email required' });
  res.json({ message: 'Password reset link sent to your email' });
});

router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'token and newPassword required' });
  res.json({ message: 'Password reset successful' });
});

router.post('/verify-email', (req, res) => {
  if (!req.body.token) return res.status(400).json({ error: 'token required' });
  res.json({ message: 'Email verified successfully' });
});

router.post('/resend-verification', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'email required' });
  res.json({ message: 'Verification email resent' });
});

router.get('/sessions', (req, res) => {
  res.json({ sessions });
});

router.post('/sessions', (req, res) => {
  const session = { id: sessions.length + 1, device: 'New Device', ip: '0.0.0.0', lastActive: new Date().toISOString(), current: false };
  sessions.push(session);
  res.status(201).json(session);
});

router.post('/sessions/invalidate-all', (req, res) => {
  sessions = [];
  res.json({ message: 'All sessions invalidated' });
});

router.post('/sessions/invalidate-others', (req, res) => {
  sessions = sessions.filter(s => s.current);
  res.json({ message: 'Other sessions invalidated' });
});

router.get('/tokens', (req, res) => {
  res.json({ tokens });
});

router.post('/tokens', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const token = { id: tokens.length + 1, name, token: `tok_${Math.random().toString(36).substr(2, 12)}`, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 90 * 86400000).toISOString(), status: 'active' };
  tokens.push(token);
  res.status(201).json(token);
});

router.get('/oauth/providers', (req, res) => {
  res.json({ providers: [{ name: 'google', enabled: true }, { name: 'github', enabled: true }, { name: 'twitter', enabled: false }] });
});

router.get('/oauth/:provider/authorize', (req, res) => {
  res.json({ provider: req.params.provider, authorizeUrl: `https://accounts.${req.params.provider}.com/o/oauth2/auth?client_id=example&redirect_uri=http://localhost:3000/callback`, state: Math.random().toString(36).substr(2) });
});

router.get('/oauth/:provider/callback', (req, res) => {
  res.json({ provider: req.params.provider, code: req.query.code, access_token: `oauth_token_${Date.now()}`, user: { email: 'user@example.com', provider: req.params.provider } });
});

router.get('/2fa/status', (req, res) => {
  res.json({ enabled: false, method: null, backupCodes: [] });
});

router.post('/2fa/setup', (req, res) => {
  res.json({ secret: 'JBSWY3DPEHPK3PXP', qr_code_url: 'https://api.qrserver.com/v1/qr-code?data=otpauth://totp/example', backupCodes: ['123456', '789012', '345678'] });
});

router.post('/mfa/setup', (req, res) => {
  res.json({ secret: 'JBSWY3DPEHPK3PXP', qr_code_url: 'https://api.qrserver.com/v1/qr-code?data=otpauth://totp/example', backupCodes: ['123456', '789012', '345678'] });
});

router.post('/mfa/verify', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'code required' });
  res.json({ verified: true, message: 'MFA verification successful' });
});

// --- Parameterized routes LAST ---

router.get('/sessions/:id', (req, res) => {
  const session = sessions.find(s => s.id === parseInt(req.params.id));
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

router.delete('/sessions/:id', (req, res) => {
  const idx = sessions.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Session not found' });
  const deleted = sessions.splice(idx, 1);
  res.json({ message: 'Session terminated', session: deleted[0] });
});

router.delete('/tokens/:id', (req, res) => {
  const idx = tokens.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Token not found' });
  tokens[idx].status = 'revoked';
  res.json({ message: 'Token revoked', token: tokens[idx] });
});

module.exports = router;
