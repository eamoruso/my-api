const express = require('express');
const router = express.Router();

const cars = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2024, trim: 'SE', class: 'Sedan', engine: { type: '2.5L 4-Cylinder', displacement: 2.5, horsepower: 203, torque: 184, transmission: '8-Speed Automatic', drivetrain: 'FWD' }, fuel: { city: 28, highway: 39, combined: 32, type: 'Gasoline' }, price: 28855, seating: 5, cargo: 15.1, safety: { rating: 5, features: ['Pre-Collision System', 'Lane Departure Alert', 'Dynamic Radar Cruise Control'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Red'], features: ['Apple CarPlay', 'Android Auto', 'Wireless Charging', 'JBL Audio'] },
  { id: 2, make: 'Honda', model: 'Civic', year: 2024, trim: 'Sport', class: 'Sedan', engine: { type: '2.0L 4-Cylinder', displacement: 2.0, horsepower: 158, torque: 138, transmission: 'CVT', drivetrain: 'FWD' }, fuel: { city: 31, highway: 40, combined: 35, type: 'Gasoline' }, price: 24950, seating: 5, cargo: 14.8, safety: { rating: 5, features: ['Honda Sensing', 'Collision Mitigation', 'Road Departure Mitigation'] }, colors: ['White', 'Black', 'Grey', 'Blue'], features: ['Bose Audio', 'Wireless Charging', 'Remote Start'] },
  { id: 3, make: 'Tesla', model: 'Model 3', year: 2024, trim: 'Long Range', class: 'Electric', engine: { type: 'Dual Motor', displacement: 0, horsepower: 346, torque: 363, transmission: 'Single-Speed', drivetrain: 'AWD' }, fuel: { city: 138, highway: 126, combined: 132, type: 'Electric' }, price: 47240, seating: 5, cargo: 23.0, safety: { rating: 5, features: ['Autopilot', 'Automatic Emergency Braking', 'Blind Spot Monitoring'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Silver'], features: ['15" Touchscreen', 'Premium Audio', 'Full Self-Driving'] },
  { id: 4, make: 'Ford', model: 'F-150', year: 2024, trim: 'XLT', class: 'Truck', engine: { type: '2.7L V6 EcoBoost', displacement: 2.7, horsepower: 325, torque: 400, transmission: '10-Speed Automatic', drivetrain: '4WD' }, fuel: { city: 20, highway: 26, combined: 23, type: 'Gasoline' }, price: 43960, seating: 5, cargo: 62.3, safety: { rating: 5, features: ['Pre-Collision Assist', 'BLIS', 'Cross-Traffic Alert'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Silver', 'Green'], features: ['SYNC 4', 'Pro Power Onboard', 'Max Recline Seats'] },
  { id: 5, make: 'BMW', model: '3 Series', year: 2024, trim: '330i', class: 'Sedan', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 255, torque: 295, transmission: '8-Speed Automatic', drivetrain: 'RWD' }, fuel: { city: 26, highway: 36, combined: 30, type: 'Gasoline' }, price: 44450, seating: 5, cargo: 17.0, safety: { rating: 5, features: ['Forward Collision Warning', 'Pedestrian Detection', 'Lane Keeping Assistant'] }, colors: ['White', 'Black', 'Blue', 'Grey', 'Red'], features: ['iDrive 8', 'Harman Kardon', 'Head-Up Display'] },
  { id: 6, make: 'Hyundai', model: 'Tucson', year: 2024, trim: 'SEL', class: 'SUV', engine: { type: '2.5L 4-Cylinder', displacement: 2.5, horsepower: 187, torque: 178, transmission: '8-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 26, highway: 33, combined: 29, type: 'Gasoline' }, price: 31550, seating: 5, cargo: 38.7, safety: { rating: 5, features: ['SmartSense', 'Forward Collision-Avoidance', 'Blind-Spot Collision Warning'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red', 'Amazon Forest'], features: ['10.25" Touchscreen', 'Wireless CarPlay', 'Bose Audio'] },
  { id: 7, make: 'Chevrolet', model: 'Equinox', year: 2024, trim: 'LT', class: 'SUV', engine: { type: '1.5L Turbo 4-Cylinder', displacement: 1.5, horsepower: 175, torque: 203, transmission: 'CVT', drivetrain: 'AWD' }, fuel: { city: 26, highway: 31, combined: 28, type: 'Gasoline' }, price: 31495, seating: 5, cargo: 29.9, safety: { rating: 5, features: ['Chevy Safety Assist', 'Automatic Emergency Braking', 'Lane Keep Assist'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Red'], features: ['Infotainment 3', 'Wireless CarPlay', 'Remote Start'] },
  { id: 8, make: 'Mercedes-Benz', model: 'C-Class', year: 2024, trim: 'C300', class: 'Sedan', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 255, torque: 295, transmission: '9-Speed Automatic', drivetrain: 'RWD' }, fuel: { city: 24, highway: 35, combined: 28, type: 'Gasoline' }, price: 46950, seating: 5, cargo: 13.1, safety: { rating: 5, features: ['Active Brake Assist', 'Blind Spot Assist', 'ATTENTION ASSIST'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Grey'], features: ['MBUX', 'Burmester Audio', 'Ambient Lighting'] },
  { id: 9, make: 'Audi', model: 'A4', year: 2024, trim: 'Premium', class: 'Sedan', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 201, torque: 236, transmission: '7-Speed S tronic', drivetrain: 'AWD' }, fuel: { city: 25, highway: 34, combined: 29, type: 'Gasoline' }, price: 41450, seating: 5, cargo: 12.0, safety: { rating: 5, features: ['Pre Sense Basic', 'Pre Sense City', 'Tire Pressure Monitoring'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red'], features: ['MMI Touch', 'Bang & Olufsen', 'Virtual Cockpit'] },
  { id: 10, make: 'Lexus', model: 'RX', year: 2024, trim: 'RX 350', class: 'SUV', engine: { type: '2.4L Turbo 4-Cylinder', displacement: 2.4, horsepower: 275, torque: 317, transmission: '8-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 22, highway: 29, combined: 25, type: 'Gasoline' }, price: 49150, seating: 5, cargo: 29.6, safety: { rating: 5, features: ['Lexus Safety System+', 'Pre-Collision System', 'Lane Tracing Assist'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Red', 'Brown'], features: ['14" Touchscreen', 'Mark Levinson Audio', 'Head-Up Display'] },
  { id: 11, make: 'Toyota', model: 'RAV4', year: 2024, trim: 'XLE', class: 'SUV', engine: { type: '2.5L 4-Cylinder', displacement: 2.5, horsepower: 203, torque: 184, transmission: '8-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 27, highway: 35, combined: 30, type: 'Gasoline' }, price: 32355, seating: 5, cargo: 37.5, safety: { rating: 5, features: ['Toyota Safety Sense 2.5+', 'Pre-Collision System', 'Full-Speed Range DRCC'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Green', 'Red'], features: ['Wireless CarPlay', 'Panoramic Moonroof', 'Smart Key'] },
  { id: 12, make: 'Honda', model: 'CR-V', year: 2024, trim: 'EX-L', class: 'SUV', engine: { type: '1.5L Turbo 4-Cylinder', displacement: 1.5, horsepower: 190, torque: 179, transmission: 'CVT', drivetrain: 'AWD' }, fuel: { city: 29, highway: 36, combined: 32, type: 'Gasoline' }, price: 36650, seating: 5, cargo: 36.3, safety: { rating: 5, features: ['Honda Sensing', 'Traffic Jam Assist', 'Low-Speed Follow'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Green'], features: ['9" Touchscreen', 'Bose Audio', 'Wireless Charging'] },
  { id: 13, make: 'Tesla', model: 'Model Y', year: 2024, trim: 'Long Range', class: 'Electric', engine: { type: 'Dual Motor', displacement: 0, horsepower: 346, torque: 363, transmission: 'Single-Speed', drivetrain: 'AWD' }, fuel: { city: 127, highway: 114, combined: 119, type: 'Electric' }, price: 50240, seating: 5, cargo: 30.2, safety: { rating: 5, features: ['Autopilot', 'Automatic Emergency Braking', 'Obstacle-Aware Acceleration'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Grey'], features: ['15" Touchscreen', 'Premium Audio', 'Glass Roof'] },
  { id: 14, make: 'Ford', model: 'Mustang', year: 2024, trim: 'GT', class: 'Coupe', engine: { type: '5.0L V8', displacement: 5.0, horsepower: 480, torque: 418, transmission: '6-Speed Manual', drivetrain: 'RWD' }, fuel: { city: 15, highway: 24, combined: 18, type: 'Gasoline' }, price: 42460, seating: 4, cargo: 13.5, safety: { rating: 5, features: ['Pre-Collision Assist', 'BLIS', 'Cross-Traffic Alert'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Yellow', 'Orange'], features: ['SYNC 4', 'B&O Audio', 'Line Lock'] },
  { id: 15, make: 'Hyundai', model: 'Ioniq 5', year: 2024, trim: 'SEL', class: 'Electric', engine: { type: 'Single Motor RWD', displacement: 0, horsepower: 225, torque: 258, transmission: 'Single-Speed', drivetrain: 'RWD' }, fuel: { city: 132, highway: 98, combined: 114, type: 'Electric' }, price: 41600, seating: 5, cargo: 27.2, safety: { rating: 5, features: ['SmartSense', 'Forward Collision-Avoidance', 'Highway Driving Assist'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Green'], features: ['Dual 12.3" Screens', 'BOSE Audio', 'Vehicle-to-Load'] },
  { id: 16, make: 'Subaru', model: 'Outback', year: 2024, trim: 'Touring', class: 'SUV', engine: { type: '2.5L 4-Cylinder', displacement: 2.5, horsepower: 182, torque: 176, transmission: 'CVT', drivetrain: 'AWD' }, fuel: { city: 26, highway: 32, combined: 29, type: 'Gasoline' }, price: 37695, seating: 5, cargo: 32.5, safety: { rating: 5, features: ['EyeSight', 'Pre-Collision Braking', 'Adaptive Cruise Control'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Green', 'Red'], features: ['11.6" Touchscreen', 'Harman Kardon', 'Panoramic Moonroof'] },
  { id: 17, make: 'Mazda', model: 'CX-5', year: 2024, trim: 'Grand Touring', class: 'SUV', engine: { type: '2.5L 4-Cylinder', displacement: 2.5, horsepower: 187, torque: 186, transmission: '6-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 24, highway: 30, combined: 26, type: 'Gasoline' }, price: 33465, seating: 5, cargo: 29.1, safety: { rating: 5, features: ['i-Activsense', 'Smart Brake Support', 'Lane-keep Assist System'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red', 'Soul Red Crystal'], features: ['10.25" Display', 'Bose Audio', 'Head-Up Display'] },
  { id: 18, make: 'Volkswagen', model: 'ID.4', year: 2024, trim: 'Pro S', class: 'Electric', engine: { type: 'Single Motor RWD', displacement: 0, horsepower: 201, torque: 229, transmission: 'Single-Speed', drivetrain: 'RWD' }, fuel: { city: 115, highway: 107, combined: 111, type: 'Electric' }, price: 43995, seating: 5, cargo: 30.3, safety: { rating: 5, features: ['IQ.DRIVE', 'Forward Collision Warning', 'Active Blind Spot Monitor'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red'], features: ['12" Touchscreen', 'Harman Kardon', 'Augmented Reality HUD'] },
  { id: 19, make: 'Nissan', model: 'Rogue', year: 2024, trim: 'SL', class: 'SUV', engine: { type: '1.5L VC-Turbo 3-Cylinder', displacement: 1.5, horsepower: 201, torque: 225, transmission: 'CVT', drivetrain: 'AWD' }, fuel: { city: 29, highway: 36, combined: 32, type: 'Gasoline' }, price: 37480, seating: 5, cargo: 36.5, safety: { rating: 5, features: ['ProPILOT Assist', 'Safety Shield 360', 'Intelligent Emergency Braking'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red', 'Champagne'], features: ['12.3" Touchscreen', 'Bose Audio', 'Panoramic Moonroof'] },
  { id: 20, make: 'Jeep', model: 'Grand Cherokee', year: 2024, trim: 'Laredo', class: 'SUV', engine: { type: '3.6L V6', displacement: 3.6, horsepower: 293, torque: 257, transmission: '8-Speed Automatic', drivetrain: '4WD' }, fuel: { city: 19, highway: 26, combined: 22, type: 'Gasoline' }, price: 38590, seating: 5, cargo: 37.7, safety: { rating: 5, features: ['Forward Collision Warning', 'Active Lane Management', 'Blind Spot Monitoring'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Green', 'Red'], features: ['Uconnect 5', 'Alpine Audio', 'Selec-Terrain'] },
  { id: 21, make: 'Kia', model: 'EV6', year: 2024, trim: 'GT-Line', class: 'Electric', engine: { type: 'Dual Motor AWD', displacement: 0, horsepower: 320, torque: 446, transmission: 'Single-Speed', drivetrain: 'AWD' }, fuel: { city: 116, highway: 103, combined: 109, type: 'Electric' }, price: 48700, seating: 5, cargo: 27.7, safety: { rating: 5, features: ['Forward Collision-Avoidance', 'Highway Driving Assist 2', 'Remote Smart Parking Assist'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red'], features: ['Dual 12.3" Displays', 'Meridian Audio', 'Vehicle-to-Load'] },
  { id: 22, make: 'Porsche', model: 'Cayenne', year: 2024, trim: 'Cayenne', class: 'SUV', engine: { type: '3.0L Turbo V6', displacement: 3.0, horsepower: 348, torque: 368, transmission: '8-Speed Tiptronic', drivetrain: 'AWD' }, fuel: { city: 19, highway: 24, combined: 21, type: 'Gasoline' }, price: 75900, seating: 5, cargo: 27.2, safety: { rating: 5, features: ['Porsche InnoDrive', 'Lane Keep Assist', 'Night Vision Assist'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red', 'Green'], features: ['12.3" PCM', 'Burmester Audio', 'Sport Chrono'] },
  { id: 23, make: 'Toyota', model: 'Corolla', year: 2024, trim: 'LE', class: 'Sedan', engine: { type: '2.0L 4-Cylinder', displacement: 2.0, horsepower: 169, torque: 151, transmission: 'CVT', drivetrain: 'FWD' }, fuel: { city: 32, highway: 41, combined: 36, type: 'Gasoline' }, price: 22050, seating: 5, cargo: 13.1, safety: { rating: 5, features: ['Toyota Safety Sense 3.0', 'Pre-Collision System', 'Full-Speed Range DRCC'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Red'], features: ['8" Touchscreen', 'Wireless CarPlay', 'Smart Key'] },
  { id: 24, make: 'Honda', model: 'Accord', year: 2024, trim: 'Touring', class: 'Sedan', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 252, torque: 273, transmission: '10-Speed Automatic', drivetrain: 'FWD' }, fuel: { city: 22, highway: 32, combined: 26, type: 'Gasoline' }, price: 38955, seating: 5, cargo: 16.7, safety: { rating: 5, features: ['Honda Sensing', 'Traffic Jam Assist', 'Parking Sensors'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red'], features: ['12.3" Touchscreen', 'Bose Audio', 'Head-Up Display'] },
  { id: 25, make: 'Ford', model: 'Bronco', year: 2024, trim: 'Badlands', class: 'SUV', engine: { type: '2.3L Turbo 4-Cylinder', displacement: 2.3, horsepower: 300, torque: 325, transmission: '10-Speed Automatic', drivetrain: '4WD' }, fuel: { city: 20, highway: 22, combined: 21, type: 'Gasoline' }, price: 45025, seating: 5, cargo: 22.4, safety: { rating: 5, features: ['Pre-Collision Assist', 'BLIS', '360-Degree Camera'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Green', 'Orange'], features: ['SYNC 4', 'B&O Audio', 'G.O.A.T. Modes'] },
  { id: 26, make: 'Chevrolet', model: 'Corvette', year: 2024, trim: 'Stingray', class: 'Coupe', engine: { type: '6.2L V8', displacement: 6.2, horsepower: 490, torque: 465, transmission: '8-Speed Dual-Clutch', drivetrain: 'RWD' }, fuel: { city: 16, highway: 24, combined: 19, type: 'Gasoline' }, price: 66050, seating: 2, cargo: 12.6, safety: { rating: 5, features: ['HD Rear Vision Camera', 'Side Blind Zone Alert', 'Rear Cross Traffic Alert'] }, colors: ['White', 'Black', 'Blue', 'Red', 'Yellow', 'Orange'], features: ['Infotainment 3', 'Bose Audio', 'Performance Data Recorder'] },
  { id: 27, make: 'Mercedes-Benz', model: 'GLC', year: 2024, trim: 'GLC 300', class: 'SUV', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 255, torque: 295, transmission: '9-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 22, highway: 30, combined: 25, type: 'Gasoline' }, price: 47800, seating: 5, cargo: 24.1, safety: { rating: 5, features: ['Active Brake Assist', 'Blind Spot Assist', 'ATTENTION ASSIST'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Grey'], features: ['MBUX', 'Burmester Audio', 'Ambient Lighting'] },
  { id: 28, make: 'BMW', model: 'X3', year: 2024, trim: 'xDrive30i', class: 'SUV', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 248, torque: 258, transmission: '8-Speed Automatic', drivetrain: 'AWD' }, fuel: { city: 23, highway: 29, combined: 25, type: 'Gasoline' }, price: 47500, seating: 5, cargo: 28.7, safety: { rating: 5, features: ['Active Driving Assistant', 'Forward Collision Warning', 'Lane Departure Warning'] }, colors: ['White', 'Black', 'Blue', 'Grey', 'Red'], features: ['iDrive 8', 'Harman Kardon', 'Panoramic Moonroof'] },
  { id: 29, make: 'Audi', model: 'Q5', year: 2024, trim: 'Premium Plus', class: 'SUV', engine: { type: '2.0L Turbo 4-Cylinder', displacement: 2.0, horsepower: 261, torque: 273, transmission: '7-Speed S tronic', drivetrain: 'AWD' }, fuel: { city: 23, highway: 29, combined: 25, type: 'Gasoline' }, price: 49800, seating: 5, cargo: 25.8, safety: { rating: 5, features: ['Pre Sense Basic', 'Pre Sense City', 'Exit Warning'] }, colors: ['White', 'Black', 'Grey', 'Blue', 'Red'], features: ['MMI Touch', 'Bang & Olufsen', 'Virtual Cockpit'] },
  { id: 30, make: 'Lexus', model: 'ES', year: 2024, trim: '350', class: 'Sedan', engine: { type: '3.5L V6', displacement: 3.5, horsepower: 302, torque: 267, transmission: '8-Speed Automatic', drivetrain: 'FWD' }, fuel: { city: 22, highway: 32, combined: 26, type: 'Gasoline' }, price: 42490, seating: 5, cargo: 16.7, safety: { rating: 5, features: ['Lexus Safety System+', 'Pre-Collision System', 'Lane Departure Alert'] }, colors: ['White', 'Black', 'Silver', 'Blue', 'Red', 'Brown'], features: ['12.3" Touchscreen', 'Mark Levinson Audio', 'Climate Concierge'] }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, make, model, class: carClass, minYear, maxYear, maxPrice, fuelType } = req.query;
  let filtered = [...cars];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(c => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || c.trim.toLowerCase().includes(q)); }
  if (make) filtered = filtered.filter(c => c.make.toLowerCase() === make.toLowerCase());
  if (model) filtered = filtered.filter(c => c.model.toLowerCase().includes(model.toLowerCase()));
  if (carClass) filtered = filtered.filter(c => c.class.toLowerCase() === carClass.toLowerCase());
  if (minYear) filtered = filtered.filter(c => c.year >= parseInt(minYear));
  if (maxYear) filtered = filtered.filter(c => c.year <= parseInt(maxYear));
  if (maxPrice) filtered = filtered.filter(c => c.price <= parseInt(maxPrice));
  if (fuelType) filtered = filtered.filter(c => c.fuel.type.toLowerCase() === fuelType.toLowerCase());
  const start = (page - 1) * limit;
  res.json({ cars: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/makes', (req, res) => {
  const makes = {};
  cars.forEach(c => { makes[c.make] = (makes[c.make] || 0) + 1; });
  res.json({ makes: Object.entries(makes).map(([name, count]) => ({ name, count })) });
});

router.get('/makes/:make', (req, res) => {
  const results = cars.filter(c => c.make.toLowerCase() === req.params.make.toLowerCase());
  res.json({ make: req.params.make, count: results.length, cars: results });
});

router.get('/classes', (req, res) => {
  const classes = {};
  cars.forEach(c => { classes[c.class] = (classes[c.class] || 0) + 1; });
  res.json({ classes: Object.entries(classes).map(([name, count]) => ({ name, count })) });
});

router.get('/classes/:class', (req, res) => {
  const results = cars.filter(c => c.class.toLowerCase() === req.params.class.toLowerCase());
  res.json({ class: req.params.class, count: results.length, cars: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q (query) required' });
  const query = q.toLowerCase();
  const results = cars.filter(c => c.make.toLowerCase().includes(query) || c.model.toLowerCase().includes(query) || c.trim.toLowerCase().includes(query));
  res.json({ query: q, count: results.length, cars: results });
});

router.get('/compare', (req, res) => {
  const { ids } = req.query;
  if (!ids) return res.status(400).json({ error: 'ids query param required (comma-separated)' });
  const idList = ids.split(',').map(Number).filter(Boolean);
  const results = cars.filter(c => idList.includes(c.id));
  res.json({ count: results.length, cars: results.map(c => ({ make: c.make, model: c.model, year: c.year, price: c.price, fuel: c.fuel, horsepower: c.engine.horsepower, safety: c.safety })) });
});

router.get('/fuel-efficient', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sorted = [...cars].sort((a, b) => b.fuel.combined - a.fuel.combined);
  res.json({ limit, cars: sorted.slice(0, limit) });
});

router.get('/stats', (req, res) => {
  const makeCounts = {};
  const classCounts = {};
  cars.forEach(c => { makeCounts[c.make] = (makeCounts[c.make] || 0) + 1; classCounts[c.class] = (classCounts[c.class] || 0) + 1; });
  res.json({ totalCars: cars.length, averagePrice: Math.round(cars.reduce((s, c) => s + c.price, 0) / cars.length), averageHorsepower: Math.round(cars.reduce((s, c) => s + c.engine.horsepower, 0) / cars.length), makes: makeCounts, classes: classCounts });
});

router.post('/', (req, res) => {
  const car = { id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1, ...req.body };
  cars.push(car);
  res.status(201).json(car);
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/:id/reviews', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ carId: car.id, make: car.make, model: car.model, reviews: [
    { id: 1, rating: 5, comment: `The ${car.year} ${car.make} ${car.model} is outstanding.`, author: 'CarExpert', date: '2026-05-10T10:00:00Z' },
    { id: 2, rating: 4, comment: 'Great value for the price.', author: 'AutoReviewer', date: '2026-05-15T14:30:00Z' }
  ]});
});

router.post('/:id/reviews', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.status(201).json({ id: Date.now(), carId: car.id, ...req.body, date: new Date().toISOString() });
});

router.get('/:id/specs', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ id: car.id, make: car.make, model: car.model, year: car.year, trim: car.trim, class: car.class, engine: car.engine, fuel: car.fuel, price: car.price, seating: car.seating, cargo: car.cargo });
});

router.get('/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

router.put('/:id', (req, res) => {
  const idx = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Car not found' });
  cars[idx] = { ...cars[idx], ...req.body, id: cars[idx].id };
  res.json(cars[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Car not found' });
  Object.assign(cars[idx], req.body);
  res.json(cars[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Car not found' });
  const deleted = cars.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
