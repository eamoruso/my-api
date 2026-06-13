const express = require('express');
const router = express.Router();

const countries = [
  { id: 1, name: 'United States', capital: 'Washington D.C.', region: 'Americas', subregion: 'Northern America', population: 331002651, area: 9833520, languages: ['English'], currency: { code: 'USD', name: 'US Dollar', symbol: '$' }, flag: '🇺🇸', timezone: 'UTC-5 to UTC-10', callingCode: '+1', gdp: 21400000, hdi: 0.926, coordinates: { lat: 38.9072, lon: -77.0369 } },
  { id: 2, name: 'Canada', capital: 'Ottawa', region: 'Americas', subregion: 'Northern America', population: 38005238, area: 9984670, languages: ['English', 'French'], currency: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }, flag: '🇨🇦', timezone: 'UTC-3.5 to UTC-8', callingCode: '+1', gdp: 1640000, hdi: 0.936, coordinates: { lat: 45.4215, lon: -75.6972 } },
  { id: 3, name: 'United Kingdom', capital: 'London', region: 'Europe', subregion: 'Northern Europe', population: 67886011, area: 242495, languages: ['English'], currency: { code: 'GBP', name: 'Pound Sterling', symbol: '£' }, flag: '🇬🇧', timezone: 'UTC+0', callingCode: '+44', gdp: 2830000, hdi: 0.929, coordinates: { lat: 51.5074, lon: -0.1278 } },
  { id: 4, name: 'Germany', capital: 'Berlin', region: 'Europe', subregion: 'Western Europe', population: 83783942, area: 357114, languages: ['German'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇩🇪', timezone: 'UTC+1', callingCode: '+49', gdp: 3850000, hdi: 0.942, coordinates: { lat: 52.5200, lon: 13.4050 } },
  { id: 5, name: 'France', capital: 'Paris', region: 'Europe', subregion: 'Western Europe', population: 67390000, area: 640679, languages: ['French'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇫🇷', timezone: 'UTC+1', callingCode: '+33', gdp: 2720000, hdi: 0.903, coordinates: { lat: 48.8566, lon: 2.3522 } },
  { id: 6, name: 'Japan', capital: 'Tokyo', region: 'Asia', subregion: 'Eastern Asia', population: 125800000, area: 377930, languages: ['Japanese'], currency: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }, flag: '🇯🇵', timezone: 'UTC+9', callingCode: '+81', gdp: 5080000, hdi: 0.925, coordinates: { lat: 35.6762, lon: 139.6503 } },
  { id: 7, name: 'Australia', capital: 'Canberra', region: 'Oceania', subregion: 'Australia and New Zealand', population: 25687041, area: 7692024, languages: ['English'], currency: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }, flag: '🇦🇺', timezone: 'UTC+8 to UTC+11', callingCode: '+61', gdp: 1390000, hdi: 0.951, coordinates: { lat: -35.2809, lon: 149.1300 } },
  { id: 8, name: 'Brazil', capital: 'Brasília', region: 'Americas', subregion: 'South America', population: 212559417, area: 8515767, languages: ['Portuguese'], currency: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }, flag: '🇧🇷', timezone: 'UTC-3 to UTC-5', callingCode: '+55', gdp: 1440000, hdi: 0.754, coordinates: { lat: -15.7975, lon: -47.8919 } },
  { id: 9, name: 'India', capital: 'New Delhi', region: 'Asia', subregion: 'Southern Asia', population: 1380004385, area: 3287263, languages: ['Hindi', 'English'], currency: { code: 'INR', name: 'Indian Rupee', symbol: '₹' }, flag: '🇮🇳', timezone: 'UTC+5:30', callingCode: '+91', gdp: 2870000, hdi: 0.645, coordinates: { lat: 28.6139, lon: 77.2090 } },
  { id: 10, name: 'China', capital: 'Beijing', region: 'Asia', subregion: 'Eastern Asia', population: 1402112000, area: 9596961, languages: ['Mandarin'], currency: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }, flag: '🇨🇳', timezone: 'UTC+8', callingCode: '+86', gdp: 14700000, hdi: 0.768, coordinates: { lat: 39.9042, lon: 116.4074 } },
  { id: 11, name: 'South Korea', capital: 'Seoul', region: 'Asia', subregion: 'Eastern Asia', population: 51780579, area: 100210, languages: ['Korean'], currency: { code: 'KRW', name: 'South Korean Won', symbol: '₩' }, flag: '🇰🇷', timezone: 'UTC+9', callingCode: '+82', gdp: 1630000, hdi: 0.925, coordinates: { lat: 37.5665, lon: 126.9780 } },
  { id: 12, name: 'Mexico', capital: 'Mexico City', region: 'Americas', subregion: 'Central America', population: 128932753, area: 1964375, languages: ['Spanish'], currency: { code: 'MXN', name: 'Mexican Peso', symbol: '$' }, flag: '🇲🇽', timezone: 'UTC-6 to UTC-8', callingCode: '+52', gdp: 1270000, hdi: 0.779, coordinates: { lat: 19.4326, lon: -99.1332 } },
  { id: 13, name: 'Italy', capital: 'Rome', region: 'Europe', subregion: 'Southern Europe', population: 60367477, area: 301336, languages: ['Italian'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇮🇹', timezone: 'UTC+1', callingCode: '+39', gdp: 2000000, hdi: 0.895, coordinates: { lat: 41.9028, lon: 12.4964 } },
  { id: 14, name: 'Spain', capital: 'Madrid', region: 'Europe', subregion: 'Southern Europe', population: 47351567, area: 505992, languages: ['Spanish'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇪🇸', timezone: 'UTC+1', callingCode: '+34', gdp: 1390000, hdi: 0.905, coordinates: { lat: 40.4168, lon: -3.7038 } },
  { id: 15, name: 'Russia', capital: 'Moscow', region: 'Europe', subregion: 'Eastern Europe', population: 145934462, area: 17098242, languages: ['Russian'], currency: { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }, flag: '🇷🇺', timezone: 'UTC+2 to UTC+12', callingCode: '+7', gdp: 1700000, hdi: 0.824, coordinates: { lat: 55.7558, lon: 37.6173 } },
  { id: 16, name: 'South Africa', capital: 'Pretoria', region: 'Africa', subregion: 'Southern Africa', population: 59308690, area: 1219090, languages: ['English', 'Afrikaans', 'Zulu'], currency: { code: 'ZAR', name: 'South African Rand', symbol: 'R' }, flag: '🇿🇦', timezone: 'UTC+2', callingCode: '+27', gdp: 351000, hdi: 0.713, coordinates: { lat: -25.7479, lon: 28.2293 } },
  { id: 17, name: 'Nigeria', capital: 'Abuja', region: 'Africa', subregion: 'Western Africa', population: 206139589, area: 923768, languages: ['English'], currency: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }, flag: '🇳🇬', timezone: 'UTC+1', callingCode: '+234', gdp: 440000, hdi: 0.539, coordinates: { lat: 9.0765, lon: 7.3986 } },
  { id: 18, name: 'Egypt', capital: 'Cairo', region: 'Africa', subregion: 'Northern Africa', population: 102334404, area: 1002450, languages: ['Arabic'], currency: { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' }, flag: '🇪🇬', timezone: 'UTC+2', callingCode: '+20', gdp: 303000, hdi: 0.731, coordinates: { lat: 30.0444, lon: 31.2357 } },
  { id: 19, name: 'Turkey', capital: 'Ankara', region: 'Asia', subregion: 'Western Asia', population: 84339067, area: 783562, languages: ['Turkish'], currency: { code: 'TRY', name: 'Turkish Lira', symbol: '₺' }, flag: '🇹🇷', timezone: 'UTC+3', callingCode: '+90', gdp: 720000, hdi: 0.820, coordinates: { lat: 39.9334, lon: 32.8597 } },
  { id: 20, name: 'Singapore', capital: 'Singapore', region: 'Asia', subregion: 'South-Eastern Asia', population: 5850342, area: 710, languages: ['English', 'Malay', 'Mandarin', 'Tamil'], currency: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }, flag: '🇸🇬', timezone: 'UTC+8', callingCode: '+65', gdp: 340000, hdi: 0.938, coordinates: { lat: 1.3521, lon: 103.8198 } },
  { id: 21, name: 'Switzerland', capital: 'Bern', region: 'Europe', subregion: 'Western Europe', population: 8654622, area: 41284, languages: ['German', 'French', 'Italian', 'Romansh'], currency: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }, flag: '🇨🇭', timezone: 'UTC+1', callingCode: '+41', gdp: 703000, hdi: 0.962, coordinates: { lat: 46.9480, lon: 7.4474 } },
  { id: 22, name: 'Sweden', capital: 'Stockholm', region: 'Europe', subregion: 'Northern Europe', population: 10099265, area: 450295, languages: ['Swedish'], currency: { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }, flag: '🇸🇪', timezone: 'UTC+1', callingCode: '+46', gdp: 530000, hdi: 0.947, coordinates: { lat: 59.3293, lon: 18.0686 } },
  { id: 23, name: 'Norway', capital: 'Oslo', region: 'Europe', subregion: 'Northern Europe', population: 5421241, area: 323802, languages: ['Norwegian'], currency: { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }, flag: '🇳🇴', timezone: 'UTC+1', callingCode: '+47', gdp: 403000, hdi: 0.961, coordinates: { lat: 59.9139, lon: 10.7522 } },
  { id: 24, name: 'Iceland', capital: 'Reykjavik', region: 'Europe', subregion: 'Northern Europe', population: 366425, area: 103000, languages: ['Icelandic'], currency: { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr' }, flag: '🇮🇸', timezone: 'UTC+0', callingCode: '+354', gdp: 24000, hdi: 0.959, coordinates: { lat: 64.1466, lon: -21.9426 } },
  { id: 25, name: 'New Zealand', capital: 'Wellington', region: 'Oceania', subregion: 'Australia and New Zealand', population: 5084300, area: 268838, languages: ['English', 'Māori'], currency: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }, flag: '🇳🇿', timezone: 'UTC+12', callingCode: '+64', gdp: 210000, hdi: 0.937, coordinates: { lat: -41.2865, lon: 174.7762 } },
  { id: 26, name: 'Argentina', capital: 'Buenos Aires', region: 'Americas', subregion: 'South America', population: 45195774, area: 2780400, languages: ['Spanish'], currency: { code: 'ARS', name: 'Argentine Peso', symbol: '$' }, flag: '🇦🇷', timezone: 'UTC-3', callingCode: '+54', gdp: 389000, hdi: 0.842, coordinates: { lat: -34.6037, lon: -58.3816 } },
  { id: 27, name: 'Chile', capital: 'Santiago', region: 'Americas', subregion: 'South America', population: 19116201, area: 756102, languages: ['Spanish'], currency: { code: 'CLP', name: 'Chilean Peso', symbol: '$' }, flag: '🇨🇱', timezone: 'UTC-4', callingCode: '+56', gdp: 283000, hdi: 0.855, coordinates: { lat: -33.4489, lon: -70.6693 } },
  { id: 28, name: 'Colombia', capital: 'Bogotá', region: 'Americas', subregion: 'South America', population: 50882891, area: 1141748, languages: ['Spanish'], currency: { code: 'COP', name: 'Colombian Peso', symbol: '$' }, flag: '🇨🇴', timezone: 'UTC-5', callingCode: '+57', gdp: 271000, hdi: 0.752, coordinates: { lat: 4.7110, lon: -74.0721 } },
  { id: 29, name: 'Kenya', capital: 'Nairobi', region: 'Africa', subregion: 'Eastern Africa', population: 53771296, area: 580367, languages: ['English', 'Swahili'], currency: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' }, flag: '🇰🇪', timezone: 'UTC+3', callingCode: '+254', gdp: 99000, hdi: 0.575, coordinates: { lat: -1.2921, lon: 36.8219 } },
  { id: 30, name: 'Morocco', capital: 'Rabat', region: 'Africa', subregion: 'Northern Africa', population: 36910560, area: 446550, languages: ['Arabic', 'Berber'], currency: { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD' }, flag: '🇲🇦', timezone: 'UTC+1', callingCode: '+212', gdp: 119000, hdi: 0.683, coordinates: { lat: 34.0209, lon: -6.8416 } },
  { id: 31, name: 'Thailand', capital: 'Bangkok', region: 'Asia', subregion: 'South-Eastern Asia', population: 69799978, area: 513120, languages: ['Thai'], currency: { code: 'THB', name: 'Thai Baht', symbol: '฿' }, flag: '🇹🇭', timezone: 'UTC+7', callingCode: '+66', gdp: 502000, hdi: 0.800, coordinates: { lat: 13.7563, lon: 100.5018 } },
  { id: 32, name: 'Indonesia', capital: 'Jakarta', region: 'Asia', subregion: 'South-Eastern Asia', population: 273523615, area: 1904569, languages: ['Indonesian'], currency: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' }, flag: '🇮🇩', timezone: 'UTC+7 to UTC+9', callingCode: '+62', gdp: 1120000, hdi: 0.718, coordinates: { lat: -6.2088, lon: 106.8456 } },
  { id: 33, name: 'Vietnam', capital: 'Hanoi', region: 'Asia', subregion: 'South-Eastern Asia', population: 97338579, area: 331212, languages: ['Vietnamese'], currency: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' }, flag: '🇻🇳', timezone: 'UTC+7', callingCode: '+84', gdp: 262000, hdi: 0.703, coordinates: { lat: 21.0278, lon: 105.8342 } },
  { id: 34, name: 'Greece', capital: 'Athens', region: 'Europe', subregion: 'Southern Europe', population: 10423054, area: 131957, languages: ['Greek'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇬🇷', timezone: 'UTC+2', callingCode: '+30', gdp: 189000, hdi: 0.888, coordinates: { lat: 37.9838, lon: 23.7275 } },
  { id: 35, name: 'Portugal', capital: 'Lisbon', region: 'Europe', subregion: 'Southern Europe', population: 10196709, area: 92090, languages: ['Portuguese'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇵🇹', timezone: 'UTC+0', callingCode: '+351', gdp: 228000, hdi: 0.866, coordinates: { lat: 38.7223, lon: -9.1393 } },
  { id: 36, name: 'Ireland', capital: 'Dublin', region: 'Europe', subregion: 'Northern Europe', population: 4937786, area: 70273, languages: ['English', 'Irish'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇮🇪', timezone: 'UTC+0', callingCode: '+353', gdp: 388000, hdi: 0.945, coordinates: { lat: 53.3498, lon: -6.2603 } },
  { id: 37, name: 'Austria', capital: 'Vienna', region: 'Europe', subregion: 'Western Europe', population: 9006398, area: 83871, languages: ['German'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇦🇹', timezone: 'UTC+1', callingCode: '+43', gdp: 432000, hdi: 0.916, coordinates: { lat: 48.2082, lon: 16.3738 } },
  { id: 38, name: 'Poland', capital: 'Warsaw', region: 'Europe', subregion: 'Eastern Europe', population: 37846611, area: 312679, languages: ['Polish'], currency: { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' }, flag: '🇵🇱', timezone: 'UTC+1', callingCode: '+48', gdp: 594000, hdi: 0.876, coordinates: { lat: 52.2297, lon: 21.0122 } },
  { id: 39, name: 'Ukraine', capital: 'Kyiv', region: 'Europe', subregion: 'Eastern Europe', population: 43733762, area: 603500, languages: ['Ukrainian'], currency: { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' }, flag: '🇺🇦', timezone: 'UTC+2', callingCode: '+380', gdp: 155000, hdi: 0.773, coordinates: { lat: 50.4501, lon: 30.5234 } },
  { id: 40, name: 'Israel', capital: 'Jerusalem', region: 'Asia', subregion: 'Western Asia', population: 9217000, area: 20770, languages: ['Hebrew', 'Arabic'], currency: { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' }, flag: '🇮🇱', timezone: 'UTC+2', callingCode: '+972', gdp: 402000, hdi: 0.919, coordinates: { lat: 31.7683, lon: 35.2137 } },
  { id: 41, name: 'United Arab Emirates', capital: 'Abu Dhabi', region: 'Asia', subregion: 'Western Asia', population: 9890402, area: 83600, languages: ['Arabic'], currency: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }, flag: '🇦🇪', timezone: 'UTC+4', callingCode: '+971', gdp: 421000, hdi: 0.911, coordinates: { lat: 24.4539, lon: 54.3773 } },
  { id: 42, name: 'Saudi Arabia', capital: 'Riyadh', region: 'Asia', subregion: 'Western Asia', population: 34813871, area: 2149690, languages: ['Arabic'], currency: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' }, flag: '🇸🇦', timezone: 'UTC+3', callingCode: '+966', gdp: 700000, hdi: 0.854, coordinates: { lat: 24.7136, lon: 46.6753 } },
  { id: 43, name: 'Peru', capital: 'Lima', region: 'Americas', subregion: 'South America', population: 32971854, area: 1285216, languages: ['Spanish'], currency: { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.' }, flag: '🇵🇪', timezone: 'UTC-5', callingCode: '+51', gdp: 202000, hdi: 0.762, coordinates: { lat: -12.0464, lon: -77.0428 } },
  { id: 44, name: 'Czech Republic', capital: 'Prague', region: 'Europe', subregion: 'Eastern Europe', population: 10708981, area: 78866, languages: ['Czech'], currency: { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' }, flag: '🇨🇿', timezone: 'UTC+1', callingCode: '+420', gdp: 245000, hdi: 0.889, coordinates: { lat: 50.0755, lon: 14.4378 } },
  { id: 45, name: 'Denmark', capital: 'Copenhagen', region: 'Europe', subregion: 'Northern Europe', population: 5792202, area: 43094, languages: ['Danish'], currency: { code: 'DKK', name: 'Danish Krone', symbol: 'kr' }, flag: '🇩🇰', timezone: 'UTC+1', callingCode: '+45', gdp: 340000, hdi: 0.948, coordinates: { lat: 55.6761, lon: 12.5683 } },
  { id: 46, name: 'Finland', capital: 'Helsinki', region: 'Europe', subregion: 'Northern Europe', population: 5540720, area: 338424, languages: ['Finnish', 'Swedish'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇫🇮', timezone: 'UTC+2', callingCode: '+358', gdp: 269000, hdi: 0.940, coordinates: { lat: 60.1699, lon: 24.9384 } },
  { id: 47, name: 'Netherlands', capital: 'Amsterdam', region: 'Europe', subregion: 'Western Europe', population: 17441139, area: 41850, languages: ['Dutch'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇳🇱', timezone: 'UTC+1', callingCode: '+31', gdp: 912000, hdi: 0.941, coordinates: { lat: 52.3676, lon: 4.9041 } },
  { id: 48, name: 'Belgium', capital: 'Brussels', region: 'Europe', subregion: 'Western Europe', population: 11589623, area: 30528, languages: ['Dutch', 'French', 'German'], currency: { code: 'EUR', name: 'Euro', symbol: '€' }, flag: '🇧🇪', timezone: 'UTC+1', callingCode: '+32', gdp: 521000, hdi: 0.937, coordinates: { lat: 50.8503, lon: 4.3517 } },
  { id: 49, name: 'Malaysia', capital: 'Kuala Lumpur', region: 'Asia', subregion: 'South-Eastern Asia', population: 32365999, area: 330803, languages: ['Malay'], currency: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' }, flag: '🇲🇾', timezone: 'UTC+8', callingCode: '+60', gdp: 337000, hdi: 0.803, coordinates: { lat: 3.1390, lon: 101.6869 } },
  { id: 50, name: 'Philippines', capital: 'Manila', region: 'Asia', subregion: 'South-Eastern Asia', population: 109581078, area: 300000, languages: ['Filipino', 'English'], currency: { code: 'PHP', name: 'Philippine Peso', symbol: '₱' }, flag: '🇵🇭', timezone: 'UTC+8', callingCode: '+63', gdp: 362000, hdi: 0.699, coordinates: { lat: 14.5995, lon: 120.9842 } }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 20, search, region, subregion } = req.query;
  let filtered = [...countries];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q)); }
  if (region) filtered = filtered.filter(c => c.region === region);
  if (subregion) filtered = filtered.filter(c => c.subregion === subregion);
  const start = (page - 1) * limit;
  res.json({ countries: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/regions', (req, res) => {
  const regions = {};
  countries.forEach(c => { regions[c.region] = (regions[c.region] || 0) + 1; });
  res.json({ regions: Object.entries(regions).map(([name, count]) => ({ name, count })) });
});

router.get('/regions/:region', (req, res) => {
  const results = countries.filter(c => c.region === req.params.region);
  res.json({ region: req.params.region, count: results.length, countries: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q (query) required' });
  const query = q.toLowerCase();
  const results = countries.filter(c => c.name.toLowerCase().includes(query) || c.capital.toLowerCase().includes(query) || c.languages.some(l => l.toLowerCase().includes(query)));
  res.json({ query: q, count: results.length, countries: results });
});

router.get('/population/rank', (req, res) => {
  res.json({ countries: [...countries].sort((a, b) => b.population - a.population).map((c, i) => ({ rank: i + 1, name: c.name, population: c.population })) });
});

router.get('/area/rank', (req, res) => {
  res.json({ countries: [...countries].sort((a, b) => b.area - a.area).map((c, i) => ({ rank: i + 1, name: c.name, area: c.area })) });
});

router.get('/stats', (req, res) => {
  const regionCounts = {};
  countries.forEach(c => { regionCounts[c.region] = (regionCounts[c.region] || 0) + 1; });
  res.json({ totalCountries: countries.length, totalPopulation: countries.reduce((s, c) => s + c.population, 0), totalArea: countries.reduce((s, c) => s + c.area, 0), regions: regionCounts, highestHDI: countries.sort((a, b) => b.hdi - a.hdi).slice(0, 3).map(c => ({ name: c.name, hdi: c.hdi })) });
});

router.get('/languages', (req, res) => {
  const langs = {};
  countries.forEach(c => c.languages.forEach(l => { langs[l] = (langs[l] || 0) + 1; }));
  res.json({ languages: Object.entries(langs).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count) });
});

router.get('/currencies', (req, res) => {
  const curr = {};
  countries.forEach(c => { curr[c.currency.code] = { code: c.currency.code, name: c.currency.name, symbol: c.currency.symbol, usedBy: (curr[c.currency.code]?.usedBy || 0) + 1 }; });
  res.json({ currencies: Object.values(curr) });
});

router.post('/', (req, res) => {
  const country = { id: countries.length > 0 ? Math.max(...countries.map(c => c.id)) + 1 : 1, ...req.body };
  countries.push(country);
  res.status(201).json(country);
});

router.get('/code/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  const country = countries.find(c => c.flag === code || c.currency.code === code || c.name.toUpperCase().startsWith(code) || (c.name === 'United States' && code === 'US') || (c.name === 'United Kingdom' && code === 'UK'));
  if (!country) return res.status(404).json({ error: 'Country code not found' });
  res.json(country);
});

router.get('/compare/:id1/:id2', (req, res) => {
  const c1 = countries.find(c => c.id === parseInt(req.params.id1));
  const c2 = countries.find(c => c.id === parseInt(req.params.id2));
  if (!c1 || !c2) return res.status(404).json({ error: 'Country not found' });
  res.json({ countries: [c1, c2].map(c => ({ name: c.name, population: c.population, area: c.area, gdp: c.gdp, hdi: c.hdi })) });
});

router.get('/:id/cities', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json({ country: country.name, cities: [{ name: country.capital, population: Math.round(country.population * 0.1), isCapital: true }] });
});

router.get('/:id/population', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json({ country: country.name, population: country.population, area: country.area, density: Math.round(country.population / country.area) });
});

router.get('/:id/economy', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json({ country: country.name, gdp: country.gdp, currency: country.currency, hdi: country.hdi, gdpPerCapita: Math.round(country.gdp * 1000000 / country.population) });
});

router.get('/:id/demographics', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json({ country: country.name, population: country.population, area: country.area, populationDensity: Math.round(country.population / country.area), languages: country.languages });
});

router.get('/:id/neighbors', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json({ country: country.name, region: country.region, neighbors: countries.filter(c => c.region === country.region && c.id !== country.id).slice(0, 5) });
});

router.get('/:id', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json(country);
});

router.put('/:id', (req, res) => {
  const idx = countries.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Country not found' });
  countries[idx] = { ...countries[idx], ...req.body, id: countries[idx].id };
  res.json(countries[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = countries.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Country not found' });
  Object.assign(countries[idx], req.body);
  res.json(countries[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = countries.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Country not found' });
  const deleted = countries.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
