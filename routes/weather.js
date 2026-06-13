const express = require('express');
const router = express.Router();

const weather = [
  { id: 1, city: 'New York', country: 'US', region: 'Northeast', coordinates: { lat: 40.7128, lon: -74.0060 }, current: { temp: 28, feelsLike: 30, humidity: 65, wind: { speed: 12, direction: 'NE' }, condition: 'Partly Cloudy', uvIndex: 6, visibility: 10 } },
  { id: 2, city: 'Los Angeles', country: 'US', region: 'West', coordinates: { lat: 34.0522, lon: -118.2437 }, current: { temp: 32, feelsLike: 33, humidity: 40, wind: { speed: 8, direction: 'W' }, condition: 'Sunny', uvIndex: 9, visibility: 15 } },
  { id: 3, city: 'London', country: 'GB', region: 'Europe', coordinates: { lat: 51.5074, lon: -0.1278 }, current: { temp: 18, feelsLike: 17, humidity: 72, wind: { speed: 15, direction: 'SW' }, condition: 'Overcast', uvIndex: 3, visibility: 8 } },
  { id: 4, city: 'Tokyo', country: 'JP', region: 'Asia', coordinates: { lat: 35.6762, lon: 139.6503 }, current: { temp: 26, feelsLike: 29, humidity: 78, wind: { speed: 10, direction: 'SE' }, condition: 'Humid', uvIndex: 5, visibility: 9 } },
  { id: 5, city: 'Paris', country: 'FR', region: 'Europe', coordinates: { lat: 48.8566, lon: 2.3522 }, current: { temp: 22, feelsLike: 23, humidity: 55, wind: { speed: 11, direction: 'NW' }, condition: 'Clear', uvIndex: 7, visibility: 12 } },
  { id: 6, city: 'Sydney', country: 'AU', region: 'Oceania', coordinates: { lat: -33.8688, lon: 151.2093 }, current: { temp: 16, feelsLike: 14, humidity: 60, wind: { speed: 18, direction: 'S' }, condition: 'Cool', uvIndex: 3, visibility: 14 } },
  { id: 7, city: 'Dubai', country: 'AE', region: 'Middle East', coordinates: { lat: 25.2048, lon: 55.2708 }, current: { temp: 42, feelsLike: 46, humidity: 30, wind: { speed: 14, direction: 'N' }, condition: 'Hot', uvIndex: 11, visibility: 10 } },
  { id: 8, city: 'Singapore', country: 'SG', region: 'Asia', coordinates: { lat: 1.3521, lon: 103.8198 }, current: { temp: 31, feelsLike: 35, humidity: 82, wind: { speed: 6, direction: 'S' }, condition: 'Thunderstorm', uvIndex: 4, visibility: 6 } },
  { id: 9, city: 'Berlin', country: 'DE', region: 'Europe', coordinates: { lat: 52.5200, lon: 13.4050 }, current: { temp: 20, feelsLike: 19, humidity: 58, wind: { speed: 13, direction: 'W' }, condition: 'Clear', uvIndex: 6, visibility: 13 } },
  { id: 10, city: 'Mumbai', country: 'IN', region: 'Asia', coordinates: { lat: 19.0760, lon: 72.8777 }, current: { temp: 33, feelsLike: 38, humidity: 80, wind: { speed: 9, direction: 'SW' }, condition: 'Monsoon', uvIndex: 5, visibility: 7 } },
  { id: 11, city: 'Sao Paulo', country: 'BR', region: 'South America', coordinates: { lat: -23.5505, lon: -46.6333 }, current: { temp: 22, feelsLike: 23, humidity: 68, wind: { speed: 10, direction: 'E' }, condition: 'Mild', uvIndex: 5, visibility: 11 } },
  { id: 12, city: 'Moscow', country: 'RU', region: 'Europe', coordinates: { lat: 55.7558, lon: 37.6173 }, current: { temp: 22, feelsLike: 21, humidity: 50, wind: { speed: 12, direction: 'NW' }, condition: 'Pleasant', uvIndex: 5, visibility: 14 } },
  { id: 13, city: 'Cape Town', country: 'ZA', region: 'Africa', coordinates: { lat: -33.9249, lon: 18.4241 }, current: { temp: 17, feelsLike: 16, humidity: 65, wind: { speed: 20, direction: 'NW' }, condition: 'Windy', uvIndex: 4, visibility: 12 } },
  { id: 14, city: 'Toronto', country: 'CA', region: 'North America', coordinates: { lat: 43.6532, lon: -79.3832 }, current: { temp: 24, feelsLike: 25, humidity: 55, wind: { speed: 11, direction: 'SW' }, condition: 'Sunny', uvIndex: 7, visibility: 15 } },
  { id: 15, city: 'Seoul', country: 'KR', region: 'Asia', coordinates: { lat: 37.5665, lon: 126.9780 }, current: { temp: 25, feelsLike: 27, humidity: 70, wind: { speed: 8, direction: 'SE' }, condition: 'Warm', uvIndex: 6, visibility: 10 } },
  { id: 16, city: 'Mexico City', country: 'MX', region: 'North America', coordinates: { lat: 19.4326, lon: -99.1332 }, current: { temp: 23, feelsLike: 24, humidity: 50, wind: { speed: 7, direction: 'E' }, condition: 'Pleasant', uvIndex: 9, visibility: 13 } },
  { id: 17, city: 'Amsterdam', country: 'NL', region: 'Europe', coordinates: { lat: 52.3676, lon: 4.9041 }, current: { temp: 18, feelsLike: 17, humidity: 68, wind: { speed: 16, direction: 'W' }, condition: 'Breezy', uvIndex: 4, visibility: 10 } },
  { id: 18, city: 'Bangkok', country: 'TH', region: 'Asia', coordinates: { lat: 13.7563, lon: 100.5018 }, current: { temp: 34, feelsLike: 39, humidity: 75, wind: { speed: 5, direction: 'S' }, condition: 'Hot & Humid', uvIndex: 8, visibility: 8 } },
  { id: 19, city: 'Istanbul', country: 'TR', region: 'Europe', coordinates: { lat: 41.0082, lon: 28.9784 }, current: { temp: 26, feelsLike: 27, humidity: 55, wind: { speed: 10, direction: 'N' }, condition: 'Clear', uvIndex: 7, visibility: 14 } },
  { id: 20, city: 'Nairobi', country: 'KE', region: 'Africa', coordinates: { lat: -1.2921, lon: 36.8219 }, current: { temp: 22, feelsLike: 22, humidity: 55, wind: { speed: 9, direction: 'E' }, condition: 'Mild', uvIndex: 8, visibility: 15 } },
  { id: 21, city: 'Stockholm', country: 'SE', region: 'Europe', coordinates: { lat: 59.3293, lon: 18.0686 }, current: { temp: 18, feelsLike: 17, humidity: 60, wind: { speed: 12, direction: 'SW' }, condition: 'Mild', uvIndex: 5, visibility: 13 } },
  { id: 22, city: 'Buenos Aires', country: 'AR', region: 'South America', coordinates: { lat: -34.6037, lon: -58.3816 }, current: { temp: 14, feelsLike: 12, humidity: 70, wind: { speed: 14, direction: 'NW' }, condition: 'Cool', uvIndex: 3, visibility: 11 } },
  { id: 23, city: 'Lisbon', country: 'PT', region: 'Europe', coordinates: { lat: 38.7223, lon: -9.1393 }, current: { temp: 27, feelsLike: 28, humidity: 45, wind: { speed: 12, direction: 'NW' }, condition: 'Sunny', uvIndex: 9, visibility: 16 } },
  { id: 24, city: 'Melbourne', country: 'AU', region: 'Oceania', coordinates: { lat: -37.8136, lon: 144.9631 }, current: { temp: 13, feelsLike: 11, humidity: 68, wind: { speed: 16, direction: 'S' }, condition: 'Cool', uvIndex: 2, visibility: 12 } },
  { id: 25, city: 'Reykjavik', country: 'IS', region: 'Europe', coordinates: { lat: 64.1466, lon: -21.9426 }, current: { temp: 10, feelsLike: 7, humidity: 78, wind: { speed: 22, direction: 'N' }, condition: 'Windy & Cool', uvIndex: 2, visibility: 8 } }
];

let alerts = [
  { id: 1, city: 'Dubai', type: 'heat', severity: 'extreme', message: 'Extreme heat warning. Stay hydrated.', issuedAt: '2026-06-13T06:00:00Z', expiresAt: '2026-06-14T18:00:00Z' },
  { id: 2, city: 'Singapore', type: 'storm', severity: 'high', message: 'Thunderstorm warning in effect.', issuedAt: '2026-06-13T08:00:00Z', expiresAt: '2026-06-13T20:00:00Z' }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { country, region, minTemp, maxTemp, condition } = req.query;
  let filtered = [...weather];
  if (country) filtered = filtered.filter(w => w.country === country.toUpperCase());
  if (region) filtered = filtered.filter(w => w.region === region);
  if (minTemp) filtered = filtered.filter(w => w.current.temp >= parseInt(minTemp));
  if (maxTemp) filtered = filtered.filter(w => w.current.temp <= parseInt(maxTemp));
  if (condition) filtered = filtered.filter(w => w.current.condition.toLowerCase().includes(condition.toLowerCase()));
  res.json({ count: filtered.length, cities: filtered });
});

router.get('/current', (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'city query param required' });
  const w = weather.find(w => w.city.toLowerCase() === city.toLowerCase());
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, country: w.country, coordinates: w.coordinates, current: w.current });
});

router.get('/forecast', (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'city query param required' });
  const w = weather.find(w => w.city.toLowerCase() === city.toLowerCase());
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, country: w.country, forecast: [
    { date: '2026-06-14', high: w.current.temp + 2, low: w.current.temp - 5, condition: 'Sunny', precipitation: 0 },
    { date: '2026-06-15', high: w.current.temp + 1, low: w.current.temp - 6, condition: 'Cloudy', precipitation: 30 },
    { date: '2026-06-16', high: w.current.temp - 1, low: w.current.temp - 8, condition: 'Rainy', precipitation: 70 }
  ]});
});

router.get('/alerts', (req, res) => {
  res.json({ count: alerts.length, alerts });
});

router.get('/alerts/:id', (req, res) => {
  const alert = alerts.find(a => a.id === parseInt(req.params.id));
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  res.json(alert);
});

router.get('/regions', (req, res) => {
  const regions = {};
  weather.forEach(w => { regions[w.region] = (regions[w.region] || 0) + 1; });
  res.json({ regions: Object.entries(regions).map(([name, count]) => ({ name, count })) });
});

router.get('/cities', (req, res) => {
  const cities = weather.map(w => ({ city: w.city, country: w.country, region: w.region, temp: w.current.temp, condition: w.current.condition }));
  res.json({ count: cities.length, cities });
});

router.get('/regions/:region', (req, res) => {
  const results = weather.filter(w => w.region === req.params.region);
  res.json({ region: req.params.region, count: results.length, cities: results.map(w => ({ city: w.city, country: w.country, temp: w.current.temp, condition: w.current.condition })) });
});

router.get('/city/:city', (req, res) => {
  const w = weather.find(w => w.city.toLowerCase() === req.params.city.toLowerCase());
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json(w);
});

router.get('/compare', (req, res) => {
  const { cities } = req.query;
  if (!cities) return res.status(400).json({ error: 'cities query param required (comma-separated)' });
  const names = cities.split(',').map(c => c.trim());
  const results = weather.filter(w => names.some(n => w.city.toLowerCase() === n.toLowerCase()));
  res.json({ cities: results.map(w => ({ city: w.city, country: w.country, temp: w.current.temp, feelsLike: w.current.feelsLike, humidity: w.current.humidity, condition: w.current.condition })) });
});

router.get('/history', (req, res) => {
  const { city, date } = req.query;
  if (!city) return res.status(400).json({ error: 'city query param required' });
  const w = weather.find(w => w.city.toLowerCase() === city.toLowerCase());
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, date: date || '2026-06-01', high: w.current.temp + 3, low: w.current.temp - 4, condition: 'Sunny', precipitation: 10 });
});

router.get('/stats', (req, res) => {
  const regions = {};
  weather.forEach(w => { regions[w.region] = (regions[w.region] || 0) + 1; });
  const temps = weather.map(w => w.current.temp);
  res.json({ totalCities: weather.length, averageTemp: (temps.reduce((s, t) => s + t, 0) / temps.length).toFixed(1), hottestCity: weather.reduce((a, b) => a.current.temp > b.current.temp ? a : b).city, coldestCity: weather.reduce((a, b) => a.current.temp < b.current.temp ? a : b).city, regions });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  const results = weather.filter(w => w.city.toLowerCase().includes(q.toLowerCase()) || w.country.toLowerCase().includes(q.toLowerCase()));
  res.json({ query: q, count: results.length, cities: results.map(w => ({ id: w.id, city: w.city, country: w.country, temp: w.current.temp, condition: w.current.condition })) });
});

router.post('/alerts', (req, res) => {
  const alert = { id: alerts.length + 1, ...req.body, issuedAt: new Date().toISOString() };
  alerts.push(alert);
  res.status(201).json(alert);
});

router.put('/alerts/:id', (req, res) => {
  const idx = alerts.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Alert not found' });
  alerts[idx] = { ...alerts[idx], ...req.body, id: alerts[idx].id };
  res.json(alerts[idx]);
});

router.delete('/alerts/:id', (req, res) => {
  const idx = alerts.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Alert not found' });
  const deleted = alerts.splice(idx, 1);
  res.json(deleted[0]);
});

router.get('/city/:city', (req, res) => {
  const w = weather.find(w => w.city.toLowerCase() === req.params.city.toLowerCase());
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json(w);
});

router.get('/hourly/:id', (req, res) => {
  const w = weather.find(w => w.id === parseInt(req.params.id));
  if (!w) return res.status(404).json({ error: 'City not found' });
  const hourly = [];
  for (let i = 0; i < 24; i++) {
    hourly.push({ hour: i, temp: w.current.temp + Math.sin(i / 3) * 3, humidity: w.current.humidity + Math.sin(i / 4) * 10, condition: i > 6 && i < 18 ? w.current.condition : 'Clear' });
  }
  res.json({ city: w.city, hourly });
});

router.get('/air-quality/:id', (req, res) => {
  const w = weather.find(w => w.id === parseInt(req.params.id));
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, aqi: Math.floor(Math.random() * 100) + 1, category: 'Moderate' });
});

router.get('/astronomy/:id', (req, res) => {
  const w = weather.find(w => w.id === parseInt(req.params.id));
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, sunrise: '06:15', sunset: '20:45', moonPhase: 'Waxing Gibbous' });
});

router.get('/historical/:id', (req, res) => {
  const w = weather.find(w => w.id === parseInt(req.params.id));
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json({ city: w.city, historical: [
    { date: '2026-06-01', high: 28, low: 20, condition: 'Sunny' },
    { date: '2026-06-02', high: 27, low: 19, condition: 'Cloudy' }
  ]});
});

// --- Base parameterized route LAST ---

router.get('/:id', (req, res) => {
  const w = weather.find(w => w.id === parseInt(req.params.id));
  if (!w) return res.status(404).json({ error: 'City not found' });
  res.json(w);
});

router.put('/:id', (req, res) => {
  const idx = weather.findIndex(w => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'City not found' });
  weather[idx] = { ...weather[idx], ...req.body, id: weather[idx].id };
  res.json(weather[idx]);
});

module.exports = router;
