const express = require('express');
const router = express.Router();

// Mock users for auth (simplified)
let authToken = null;

// Authentication endpoints (+20 endpoints)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  res.json({ 
    access_token: authToken, 
    token_type: 'Bearer', 
    expires_in: 3600,
    user: { email, username: email.split('@')[0] }
  });
});

router.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) return res.status(400).json({ error: 'All fields required' });
  res.status(201).json({ 
    message: 'User registered', 
    user: { email, username },
    access_token: `token_${Date.now()}`
  });
});

router.post('/logout', (req, res) => {
  authToken = null;
  res.json({ message: 'Logged out successfully' });
});

router.post('/refresh', (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(400).json({ error: 'Refresh token required' });
  res.json({ 
    access_token: `new_token_${Date.now()}`, 
    token_type: 'Bearer', 
    expires_in: 3600
  });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  res.json({ message: 'Password reset link sent to your email' });
});

router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password required' });
  res.json({ message: 'Password reset successful' });
});

router.post('/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Old and new password required' });
  res.json({ message: 'Password changed successfully' });
});

router.post('/verify-email', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Verification token required' });
  res.json({ message: 'Email verified successfully' });
});

router.post('/resend-verification', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  res.json({ message: 'Verification email resent' });
});

router.get('/me', (req, res) => {
  res.json({ 
    id: 1, 
    email: 'current@example.com', 
    username: 'CurrentUser',
    authenticated: !!authToken
  });
});

router.post('/sessions', (req, res) => {
  res.json({ sessions: [{ id: 1, device: 'Chrome on macOS', lastActive: new Date().toISOString() }] });
});

router.delete('/sessions/current', (req, res) => {
  authToken = null;
  res.json({ message: 'Current session terminated' });
});

router.get('/sessions', (req, res) => {
  res.json({ 
    sessions: [
      { id: 1, device: 'Chrome on macOS', lastActive: new Date().toISOString(), current: true },
      { id: 2, device: 'Safari on iOS', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false }
    ]
  });
});

router.delete('/sessions/:id', (req, res) => {
  res.json({ message: `Session ${req.params.id} terminated` });
});

router.post('/2fa/enable', (req, res) => {
  const { secret } = req.body;
  if (!secret) return res.status(400).json({ error: 'Secret required' });
  res.json({ message: '2FA enabled', qr_code_url: 'https://api.qrserver.com/v1/qr-code' });
});

router.post('/2fa/disable', (req, res) => {
  res.json({ message: '2FA disabled' });
});

router.post('/2fa/verify', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code required' });
  res.json({ message: 'Code verified', enabled: true });
});

router.post('/oauth/google', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Google token required' });
  res.json({ 
    access_token: `google_token_${Date.now()}`, 
    user: { provider: 'google', email: 'user@gmail.com' }
  });
});

router.post('/oauth/github', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Github code required' });
  res.json({ 
    access_token: `github_token_${Date.now()}`, 
    user: { provider: 'github', username: 'gh_user' }
  });
});

router.get('/oauth/providers', (req, res) => {
  res.json({ providers: ['google', 'github', 'twitter'] });
});

module.exports = router;
