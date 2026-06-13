const express = require('express');
const router = express.Router();

let profiles = {};
for (let i = 1; i <= 25; i++) {
  profiles[i] = {
    userId: i,
    bio: `Profile bio for user ${i}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`,
    location: 'San Francisco, CA',
    company: 'TechCorp',
    title: 'Engineer',
    social: { twitter: `@user${i}`, github: `user${i}` },
    preferences: { theme: 'dark', notifications: true, language: 'en' },
    experience: [{ id: 1, company: 'TechCorp', role: 'Senior Engineer', startDate: '2022-01-01', endDate: null, current: true }],
    education: [{ id: 1, school: 'MIT', degree: 'BS', field: 'Computer Science', year: 2018 }],
    skills: ['JavaScript', 'Node.js', 'React', 'TypeScript'],
    endorsements: [{ id: 1, fromUserId: 2, skill: 'JavaScript', date: '2026-05-01' }],
    portfolio: [{ id: 1, name: 'Project Alpha', description: 'A cool project', url: 'https://example.com' }]
  };
}

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const all = Object.values(profiles);
  res.json({ count: all.length, profiles: all });
});

router.get('/stats', (req, res) => {
  const all = Object.values(profiles);
  const locations = {};
  all.forEach(p => { locations[p.location] = (locations[p.location] || 0) + 1; });
  res.json({ total: all.length, locations });
});

router.post('/', (req, res) => {
  const { userId, ...data } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  profiles[userId] = { userId, ...data };
  res.status(201).json(profiles[userId]);
});

// --- Sub-routes BEFORE base /:userId ---

router.get('/:userId/experience', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, experience: p.experience || [] });
});

router.post('/:userId/experience', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const exp = { id: (p.experience?.length || 0) + 1, ...req.body };
  if (!p.experience) p.experience = [];
  p.experience.push(exp);
  res.status(201).json(exp);
});

router.get('/:userId/education', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, education: p.education || [] });
});

router.post('/:userId/education', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const edu = { id: (p.education?.length || 0) + 1, ...req.body };
  if (!p.education) p.education = [];
  p.education.push(edu);
  res.status(201).json(edu);
});

router.get('/:userId/skills', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, skills: p.skills || [] });
});

router.post('/:userId/skills', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ error: 'skill required' });
  if (!p.skills) p.skills = [];
  if (!p.skills.includes(skill)) p.skills.push(skill);
  res.json({ userId: p.userId, skills: p.skills });
});

router.delete('/:userId/skills', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const { skill } = req.body;
  p.skills = (p.skills || []).filter(s => s !== skill);
  res.json({ userId: p.userId, skills: p.skills });
});

router.get('/:userId/skill-gaps', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, currentSkills: p.skills || [], recommendedSkills: ['Docker', 'Kubernetes', 'AWS', 'GraphQL'], gaps: ['Docker', 'Kubernetes', 'AWS', 'GraphQL'].filter(s => !(p.skills || []).includes(s)) });
});

router.get('/:userId/career-path', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, currentPosition: p.title, suggestedPaths: [{ title: 'Staff Engineer', match: 85 }, { title: 'Engineering Manager', match: 72 }, { title: 'Solutions Architect', match: 68 }] });
});

router.get('/:userId/match-score', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, overallScore: 78, breakdown: { skills: 82, experience: 75, education: 80, cultureFit: 74 } });
});

router.get('/:userId/networking', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, connections: 12, suggestions: [{ userId: 2, name: 'Bob Johnson', reason: 'Same department' }, { userId: 4, name: 'Diana Prince', reason: 'Similar skills' }] });
});

router.post('/:userId/networking/connections', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.status(201).json({ message: 'Connection request sent', from: parseInt(req.params.userId), to: req.body.targetUserId });
});

router.get('/:userId/portfolio', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, projects: p.portfolio || [] });
});

router.post('/:userId/portfolio/projects', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const project = { id: (p.portfolio?.length || 0) + 1, ...req.body };
  if (!p.portfolio) p.portfolio = [];
  p.portfolio.push(project);
  res.status(201).json(project);
});

router.get('/:userId/endorsements', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, endorsements: p.endorsements || [] });
});

router.post('/:userId/endorsements', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const endorsement = { id: (p.endorsements?.length || 0) + 1, ...req.body, date: new Date().toISOString() };
  if (!p.endorsements) p.endorsements = [];
  p.endorsements.push(endorsement);
  res.status(201).json(endorsement);
});

router.get('/:userId/endorsements/received', (req, res) => {
  const p = profiles[req.params.userId];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: p.userId, received: p.endorsements || [] });
});

router.get('/:userId', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

router.get('/:userId/stats', (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ userId: profile.userId, endorsements: profile.endorsements?.length || 0, skills: profile.skills?.length || 0, projects: profile.portfolio?.length || 0 });
});

router.put('/:userId', (req, res) => {
  profiles[req.params.userId] = { userId: parseInt(req.params.userId), ...req.body };
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

module.exports = router;
