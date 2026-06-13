const express = require('express');
const router = express.Router();

// Mock fruits database with colors
const fruits = [
  { id: 1, name: 'Apple', color: 'Red', variety: ['Red Delicious', 'Granny Smith', 'Fuji'], taste: 'Sweet/Tart' },
  { id: 2, name: 'Banana', color: 'Yellow', variety: ['Cavendish', 'Plantain'], taste: 'Sweet' },
  { id: 3, name: 'Orange', color: 'Orange', variety: ['Navel', 'Valencia'], taste: 'Citrus/Sweet' },
  { id: 4, name: 'Grape', color: 'Purple', variety: ['Concord', 'Thompson Seedless'], taste: 'Sweet/Tart' },
  { id: 5, name: 'Lemon', color: 'Yellow', variety: ['Eureka', 'Meyer'], taste: 'Sour/Citrus' },
  { id: 6, name: 'Blueberry', color: 'Blue', variety: ['Highbush', 'Lowbush'], taste: 'Sweet/Tart' },
  { id: 7, name: 'Strawberry', color: 'Red', variety: ['Alpine', 'Chandler'], taste: 'Sweet' },
  { id: 8, name: 'Lime', color: 'Green', variety: ['Persian', 'Key'], taste: 'Sour/Citrus' },
  { id: 9, name: 'Watermelon', color: 'Green', variety: ['Seedless', 'Crimson Sweet'], taste: 'Sweet/Refreshing' },
  { id: 10, name: 'Cherry', color: 'Red', variety: ['Bing', 'Rainier'], taste: 'Sweet/Tart' }
];

// Get fruit by name (returns its color)
router.get('/:name', (req, res) => {
  const fruit = fruits.find(f => f.name.toLowerCase() === req.params.name.toLowerCase());
  if (!fruit) return res.status(404).json({ error: 'Fruit not found' });
  res.json(fruit);
});

// Get fruit by color (list all fruits of that color)
router.get('/color/:color', (req, res) => {
  const matching = fruits.filter(f => f.color.toLowerCase() === req.params.color.toLowerCase());
  if (matching.length === 0) {
    return res.status(404).json({ 
      error: 'No fruits found with that color',
      color: req.params.color,
      availableColors: [...new Set(fruits.map(f => f.color))]
    });
  }
  res.json({ 
    color: req.params.color, 
    count: matching.length, 
    fruits: matching 
  });
});

// Get all fruit colors
router.get('/colors', (req, res) => {
  const colors = [...new Set(fruits.map(f => f.color))];
  res.json({ colors, count: colors.length });
});

// List all fruits
router.get('/', (req, res) => {
  res.json({ total: fruits.length, fruits });
});

module.exports = router;
