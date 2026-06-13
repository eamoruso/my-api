const express = require('express');
const router = express.Router();

// Mock profile data
let profiles = {
  1: { 
    userId: 1, 
    bio: 'Software developer', 
    avatar: '/avatars/1.png', 
    location: 'San Francisco', 
    website: 'https://example.com',
    social: { twitter: '@alice', github: 'alice-dev' },
    preferences: { theme: 'dark', notifications: true, language: 'en' }
  }
};

// Profile CRUD (+6 endpoints)
router.get('/:userId', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

router.post('/', (req, res) => {
  const { userId, ...data } = req.body;
  profiles[userId] = { userId, ...data };
  res.status(201).json(profiles[userId]);
});

router.put('/:userId', (req, res) => {
  if (!profiles[req.params.userId]) return res.status(404).json({ error: 'Profile not found' });
  profiles[req.params.userId] = { ...profiles[req.params.userId], ...req.body };
  res.json(profiles[req.params.userId]);
});

router.patch('/:userId', (req, res) => {
  if (!profiles[req.params.userId]) return res.status(404).json({ error: 'Profile not found' });
  Object.assign(profiles[req.params.userId], req.body);
  res.json(profiles[req.params.userId]);
});

router.delete('/:userId', (req, res) => {
  if (!profiles[req.params.userId]) return res.status(404).json({ error: 'Profile not found' });
  delete profiles[req.params.userId];
  res.json({ message: 'Profile deleted' });
});

router.post('/bulk-update', (req, res) => {
  const updates = req.body.updates || [];
  for (const update of updates) {
    if (profiles[update.userId]) profiles[update.userId] = { ...profiles[update.userId], ...update.data };
  }
  res.json({ message: 'Profiles updated', count: updates.length });
});

// Avatar endpoints (+4 endpoints)
router.get('/:userId/avatar', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ avatar: profile.avatar || null });
});

router.post('/:userId/avatar', (req, res) => {
  const { userId } = req.params;
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });
  if (!profiles[userId]) profiles[userId] = { userId };
  profiles[userId].avatar = url;
  res.json(profiles[userId]);
});

router.delete('/:userId/avatar', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  delete profile.avatar;
  res.json(profile);
});

router.post('/:userId/avatar/generate', (req, res) => {
  const { userId } = req.params;
  const color = Math.floor(Math.random()*16777215).toString(16);
  if (!profiles[userId]) profiles[userId] = { userId };
  profiles[userId].avatar = `/avatars/generated/${color}.png`;
  res.json({ avatar: profiles[userId].avatar, color });
});

// Bio endpoints (+3 endpoints)
router.get('/:userId/bio', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile || !profile.bio) return res.status(404).json({ bio: null });
  res.json({ bio: profile.bio });
});

router.put('/:userId/bio', (req, res) => {
  const { bio } = req.body;
  if (!profiles[req.params.userId]) profiles[req.params.userId] = { userId: parseInt(req.params.userId) };
  profiles[req.params.userId].bio = bio;
  res.json(profiles[req.params.userId]);
});

router.patch('/:userId/bio', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  profile.bio = (profile.bio || '') + req.body.text;
  res.json(profile);
});

// Preferences endpoints (+5 endpoints)
router.get('/:userId/preferences', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile.preferences || {});
});

router.put('/:userId/preferences', (req, res) => {
  if (!profiles[req.params.userId]) profiles[req.params.userId] = { userId: parseInt(req.params.userId) };
  profiles[req.params.userId].preferences = req.body;
  res.json(profiles[req.params.userId]);
});

router.patch('/:userId/preferences', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  profile.preferences = { ...profile.preferences, ...req.body };
  res.json(profile.preferences);
});

router.delete('/:userId/preferences', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  delete profile.preferences;
  res.json(profile);
});

router.patch('/:userId/preferences/theme', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  if (!profile.preferences) profile.preferences = {};
  profile.preferences.theme = req.body.theme;
  res.json(profile.preferences);
});

// Notifications (+3 endpoints)
router.get('/:userId/notifications', (req, res) => {
  res.json({ preferences: profiles[req.params.userId]?.preferences?.notifications ?? true });
});

router.put('/:userId/notifications', (req, res) => {
  if (!profiles[req.params.userId]) profiles[req.params.userId] = { userId: parseInt(req.params.userId) };
  if (!profiles[req.params.userId].preferences) profiles[req.params.userId].preferences = {};
  profiles[req.params.userId].preferences.notifications = req.body.enabled;
  res.json(profiles[req.params.userId]);
});

router.get('/:userId/notifications/channels', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile || !profile.preferences?.notificationChannels) return res.json({ channels: ['email'] });
  res.json({ channels: profile.preferences.notificationChannels });
});

// Social links (+3 endpoints)
router.get('/:userId/social', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile || !profile.social) return res.json({ social: {} });
  res.json(profile.social);
});

router.put('/:userId/social', (req, res) => {
  if (!profiles[req.params.userId]) profiles[req.params.userId] = { userId: parseInt(req.params.userId) };
  profiles[req.params.userId].social = req.body;
  res.json(profiles[req.params.userId]);
});

router.delete('/:userId/social/:platform', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile?.social) return res.status(404).json({ error: 'Platform not found' });
  delete profile.social[req.params.platform];
  res.json(profile.social);
});

// Public profiles (+1 endpoint)
router.get('/public/search', (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query required' });
  const results = Object.values(profiles).filter(p => 
    p.bio?.toLowerCase().includes(query.toLowerCase()) ||
    p.location?.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

module.exports = router;
