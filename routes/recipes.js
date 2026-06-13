const express = require('express');
const router = express.Router();

const recipes = [
  { id: 1, title: 'Classic Margherita Pizza', author: 'Chef Marco', cuisine: 'Italian', prepTime: 20, cookTime: 15, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Pizza Dough', amount: 500, unit: 'g' }, { name: 'San Marzano Tomatoes', amount: 400, unit: 'g' }, { name: 'Fresh Mozzarella', amount: 250, unit: 'g' }, { name: 'Fresh Basil', amount: 10, unit: 'leaves' }, { name: 'Olive Oil', amount: 2, unit: 'tbsp' }], instructions: ['Preheat oven to 500°F', 'Stretch dough into 12-inch circle', 'Spread crushed tomatoes', 'Add sliced mozzarella', 'Bake 12-15 minutes', 'Top with fresh basil'], nutrition: { calories: 266, protein: 12, carbs: 33, fat: 10, fiber: 2 }, tags: ['pizza', 'vegetarian', 'italian'], rating: 4.8, reviewCount: 342 },
  { id: 2, title: 'Chicken Tikka Masala', author: 'Chef Priya', cuisine: 'Indian', prepTime: 30, cookTime: 25, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Chicken Breast', amount: 600, unit: 'g' }, { name: 'Yogurt', amount: 200, unit: 'ml' }, { name: 'Tomato Sauce', amount: 400, unit: 'ml' }, { name: 'Cream', amount: 100, unit: 'ml' }, { name: 'Garam Masala', amount: 2, unit: 'tsp' }], instructions: ['Marinate chicken in yogurt and spices', 'Grill or pan-fry chicken', 'Make sauce with tomatoes and cream', 'Combine chicken with sauce', 'Simmer 10 minutes'], nutrition: { calories: 380, protein: 32, carbs: 18, fat: 20, fiber: 3 }, tags: ['curry', 'indian', 'spicy'], rating: 4.7, reviewCount: 289 },
  { id: 3, title: 'Sushi Rolls (Maki)', author: 'Chef Tanaka', cuisine: 'Japanese', prepTime: 40, cookTime: 20, servings: 4, difficulty: 'Hard', ingredients: [{ name: 'Sushi Rice', amount: 400, unit: 'g' }, { name: 'Nori Sheets', amount: 8, unit: 'sheets' }, { name: 'Salmon', amount: 200, unit: 'g' }, { name: 'Avocado', amount: 2, unit: 'pcs' }, { name: 'Cucumber', amount: 1, unit: 'pc' }], instructions: ['Cook and season rice', 'Prepare fish and vegetables', 'Place nori on bamboo mat', 'Spread rice, add fillings', 'Roll tightly and slice'], nutrition: { calories: 290, protein: 18, carbs: 42, fat: 6, fiber: 4 }, tags: ['sushi', 'japanese', 'seafood'], rating: 4.6, reviewCount: 198 },
  { id: 4, title: 'Tacos al Pastor', author: 'Chef Carlos', cuisine: 'Mexican', prepTime: 25, cookTime: 15, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Pork Shoulder', amount: 500, unit: 'g' }, { name: 'Corn Tortillas', amount: 8, unit: 'pcs' }, { name: 'Pineapple', amount: 1, unit: 'cup' }, { name: 'Onion', amount: 1, unit: 'pc' }, { name: 'Cilantro', amount: 1, unit: 'bunch' }], instructions: ['Marinate pork in achiote', 'Grill pork with pineapple', 'Slice thinly', 'Warm tortillas', 'Top with onion and cilantro'], nutrition: { calories: 320, protein: 22, carbs: 28, fat: 14, fiber: 3 }, tags: ['tacos', 'mexican', 'pork'], rating: 4.9, reviewCount: 456 },
  { id: 5, title: 'Pad Thai', author: 'Chef Somchai', cuisine: 'Thai', prepTime: 15, cookTime: 10, servings: 2, difficulty: 'Medium', ingredients: [{ name: 'Rice Noodles', amount: 200, unit: 'g' }, { name: 'Shrimp', amount: 150, unit: 'g' }, { name: 'Eggs', amount: 2, unit: 'pcs' }, { name: 'Bean Sprouts', amount: 1, unit: 'cup' }, { name: 'Peanuts', amount: 50, unit: 'g' }], instructions: ['Soak noodles in warm water', 'Stir-fry shrimp', 'Push aside, scramble eggs', 'Add noodles and sauce', 'Toss with sprouts and peanuts'], nutrition: { calories: 410, protein: 24, carbs: 48, fat: 14, fiber: 3 }, tags: ['noodles', 'thai', 'shrimp'], rating: 4.7, reviewCount: 312 },
  { id: 6, title: 'French Onion Soup', author: 'Chef Pierre', cuisine: 'French', prepTime: 15, cookTime: 60, servings: 4, difficulty: 'Easy', ingredients: [{ name: 'Yellow Onions', amount: 6, unit: 'pcs' }, { name: 'Beef Broth', amount: 1, unit: 'liter' }, { name: 'Gruyère Cheese', amount: 200, unit: 'g' }, { name: 'Baguette', amount: 1, unit: 'pc' }, { name: 'Butter', amount: 3, unit: 'tbsp' }], instructions: ['Caramelize onions slowly (45 min)', 'Add broth and simmer', 'Ladle into oven-safe bowls', 'Top with bread and cheese', 'Broil until bubbly'], nutrition: { calories: 350, protein: 18, carbs: 28, fat: 20, fiber: 3 }, tags: ['soup', 'french', 'cheese'], rating: 4.5, reviewCount: 234 },
  { id: 7, title: 'Kung Pao Chicken', author: 'Chef Wang', cuisine: 'Chinese', prepTime: 20, cookTime: 10, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Chicken Thigh', amount: 500, unit: 'g' }, { name: 'Peanuts', amount: 100, unit: 'g' }, { name: 'Dried Chilies', amount: 12, unit: 'pcs' }, { name: 'Soy Sauce', amount: 3, unit: 'tbsp' }, { name: 'Sesame Oil', amount: 1, unit: 'tbsp' }], instructions: ['Dice chicken and marinate', 'Stir-fry chilies until fragrant', 'Add chicken and cook through', 'Add sauce and peanuts', 'Serve over rice'], nutrition: { calories: 380, protein: 28, carbs: 16, fat: 24, fiber: 2 }, tags: ['chicken', 'chinese', 'spicy'], rating: 4.6, reviewCount: 278 },
  { id: 8, title: 'Mediterranean Quinoa Bowl', author: 'Chef Elena', cuisine: 'Mediterranean', prepTime: 10, cookTime: 15, servings: 2, difficulty: 'Easy', ingredients: [{ name: 'Quinoa', amount: 200, unit: 'g' }, { name: 'Cherry Tomatoes', amount: 150, unit: 'g' }, { name: 'Cucumber', amount: 1, unit: 'pc' }, { name: 'Feta Cheese', amount: 100, unit: 'g' }, { name: 'Olive Oil', amount: 3, unit: 'tbsp' }], instructions: ['Cook quinoa and let cool', 'Dice vegetables', 'Crumble feta', 'Toss everything with dressing', 'Season to taste'], nutrition: { calories: 320, protein: 14, carbs: 38, fat: 14, fiber: 5 }, tags: ['quinoa', 'mediterranean', 'healthy'], rating: 4.4, reviewCount: 189 },
  { id: 9, title: 'Beef Wellington', author: 'Chef Gordon', cuisine: 'British', prepTime: 40, cookTime: 25, servings: 4, difficulty: 'Hard', ingredients: [{ name: 'Beef Tenderloin', amount: 800, unit: 'g' }, { name: 'Puff Pastry', amount: 500, unit: 'g' }, { name: 'Mushrooms', amount: 300, unit: 'g' }, { name: 'Prosciutto', amount: 8, unit: 'slices' }, { name: 'Dijon Mustard', amount: 2, unit: 'tbsp' }], instructions: ['Sear beef on all sides', 'Make mushroom duxelles', 'Wrap beef in prosciutto and duxelles', 'Encase in puff pastry', 'Bake at 425°F for 25 min'], nutrition: { calories: 620, protein: 38, carbs: 32, fat: 38, fiber: 2 }, tags: ['beef', 'british', 'fancy'], rating: 4.8, reviewCount: 156 },
  { id: 10, title: 'Kimchi Fried Rice', author: 'Chef Park', cuisine: 'Korean', prepTime: 10, cookTime: 10, servings: 2, difficulty: 'Easy', ingredients: [{ name: 'Cooked Rice', amount: 300, unit: 'g' }, { name: 'Kimchi', amount: 150, unit: 'g' }, { name: 'Eggs', amount: 2, unit: 'pcs' }, { name: 'Sesame Oil', amount: 1, unit: 'tbsp' }, { name: 'Green Onions', amount: 2, unit: 'stalks' }], instructions: ['Heat oil in wok', 'Add kimchi and stir-fry', 'Add cold rice and break up', 'Push aside, scramble eggs', 'Mix everything and serve'], nutrition: { calories: 340, protein: 12, carbs: 48, fat: 12, fiber: 3 }, tags: ['rice', 'korean', 'fermented'], rating: 4.5, reviewCount: 267 },
  { id: 11, title: 'Butter Chicken', author: 'Chef Priya', cuisine: 'Indian', prepTime: 20, cookTime: 30, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Chicken', amount: 600, unit: 'g' }, { name: 'Butter', amount: 3, unit: 'tbsp' }, { name: 'Tomato Puree', amount: 400, unit: 'ml' }, { name: 'Cream', amount: 100, unit: 'ml' }, { name: 'Kasuri Methi', amount: 1, unit: 'tbsp' }], instructions: ['Marinate and grill chicken', 'Make butter-tomato sauce', 'Add cream and fenugreek', 'Simmer chicken in sauce', 'Serve with naan'], nutrition: { calories: 420, protein: 30, carbs: 14, fat: 28, fiber: 2 }, tags: ['chicken', 'indian', 'creamy'], rating: 4.8, reviewCount: 389 },
  { id: 12, title: 'Greek Salad', author: 'Chef Elena', cuisine: 'Mediterranean', prepTime: 10, cookTime: 0, servings: 2, difficulty: 'Easy', ingredients: [{ name: 'Cucumber', amount: 1, unit: 'pc' }, { name: 'Tomatoes', amount: 3, unit: 'pcs' }, { name: 'Feta', amount: 150, unit: 'g' }, { name: 'Olives', amount: 100, unit: 'g' }, { name: 'Olive Oil', amount: 3, unit: 'tbsp' }], instructions: ['Chop vegetables', 'Add olives and feta block', 'Drizzle with olive oil', 'Sprinkle oregano', 'Serve immediately'], nutrition: { calories: 280, protein: 12, carbs: 12, fat: 22, fiber: 3 }, tags: ['salad', 'greek', 'vegetarian'], rating: 4.5, reviewCount: 234 },
  { id: 13, title: 'Tonkotsu Ramen', author: 'Chef Tanaka', cuisine: 'Japanese', prepTime: 30, cookTime: 180, servings: 4, difficulty: 'Hard', ingredients: [{ name: 'Pork Bones', amount: 2, unit: 'kg' }, { name: 'Ramen Noodles', amount: 400, unit: 'g' }, { name: 'Chashu Pork', amount: 300, unit: 'g' }, { name: 'Soft-Boiled Eggs', amount: 4, unit: 'pcs' }, { name: 'Green Onions', amount: 4, unit: 'stalks' }], instructions: ['Boil pork bones 3+ hours', 'Strain and season broth', 'Cook noodles separately', 'Assemble bowls', 'Top with chashu, egg, and scallions'], nutrition: { calories: 550, protein: 35, carbs: 52, fat: 22, fiber: 3 }, tags: ['ramen', 'japanese', 'pork'], rating: 4.9, reviewCount: 456 },
  { id: 14, title: 'Caesar Salad', author: 'Chef Marco', cuisine: 'Italian', prepTime: 15, cookTime: 5, servings: 2, difficulty: 'Easy', ingredients: [{ name: 'Romaine Lettuce', amount: 2, unit: 'heads' }, { name: 'Parmesan', amount: 80, unit: 'g' }, { name: 'Croutons', amount: 100, unit: 'g' }, { name: 'Anchovies', amount: 4, unit: 'fillets' }, { name: 'Egg Yolk', amount: 1, unit: 'pc' }], instructions: ['Make dressing with anchovies and egg', 'Tear and wash lettuce', 'Toss with dressing', 'Add croutons and shaved parmesan', 'Serve immediately'], nutrition: { calories: 310, protein: 14, carbs: 18, fat: 22, fiber: 4 }, tags: ['salad', 'italian', 'classic'], rating: 4.4, reviewCount: 198 },
  { id: 15, title: 'BBQ Pulled Pork', author: 'Chef Jake', cuisine: 'American', prepTime: 15, cookTime: 480, servings: 8, difficulty: 'Medium', ingredients: [{ name: 'Pork Shoulder', amount: 2, unit: 'kg' }, { name: 'BBQ Sauce', amount: 500, unit: 'ml' }, { name: 'Apple Cider Vinegar', amount: 100, unit: 'ml' }, { name: 'Brown Sugar', amount: 3, unit: 'tbsp' }, { name: 'Brioche Buns', amount: 8, unit: 'pcs' }], instructions: ['Season pork with dry rub', 'Slow cook 8 hours at 225°F', 'Shred with forks', 'Mix with BBQ sauce', 'Serve on brioche buns'], nutrition: { calories: 480, protein: 32, carbs: 35, fat: 22, fiber: 2 }, tags: ['bbq', 'american', 'pork'], rating: 4.7, reviewCount: 345 },
  { id: 16, title: 'Falafel Bowl', author: 'Chef Omar', cuisine: 'Mediterranean', prepTime: 20, cookTime: 15, servings: 3, difficulty: 'Medium', ingredients: [{ name: 'Chickpeas', amount: 400, unit: 'g' }, { name: 'Tahini', amount: 60, unit: 'ml' }, { name: 'Pita Bread', amount: 3, unit: 'pcs' }, { name: 'Fresh Herbs', amount: 1, unit: 'bunch' }, { name: 'Lemon', amount: 2, unit: 'pcs' }], instructions: ['Blend chickpeas with herbs', 'Form into patties', 'Deep fry until golden', 'Make tahini sauce', 'Serve in pita or bowl'], nutrition: { calories: 380, protein: 16, carbs: 42, fat: 18, fiber: 8 }, tags: ['falafel', 'vegan', 'middle-eastern'], rating: 4.6, reviewCount: 267 },
  { id: 17, title: 'Shakshuka', author: 'Chef Omar', cuisine: 'Mediterranean', prepTime: 10, cookTime: 20, servings: 3, difficulty: 'Easy', ingredients: [{ name: 'Eggs', amount: 6, unit: 'pcs' }, { name: 'Canned Tomatoes', amount: 800, unit: 'g' }, { name: 'Bell Peppers', amount: 2, unit: 'pcs' }, { name: 'Onion', amount: 1, unit: 'pc' }, { name: 'Cumin', amount: 1, unit: 'tsp' }], instructions: ['Sauté onions and peppers', 'Add tomatoes and spices', 'Simmer 10 minutes', 'Make wells, crack eggs', 'Cover and cook until set'], nutrition: { calories: 240, protein: 14, carbs: 16, fat: 14, fiber: 4 }, tags: ['eggs', 'middle-eastern', 'breakfast'], rating: 4.7, reviewCount: 289 },
  { id: 18, title: 'Tom Yum Soup', author: 'Chef Somchai', cuisine: 'Thai', prepTime: 15, cookTime: 15, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Shrimp', amount: 300, unit: 'g' }, { name: 'Lemongrass', amount: 3, unit: 'stalks' }, { name: 'Galangal', amount: 5, unit: 'slices' }, { name: 'Fish Sauce', amount: 3, unit: 'tbsp' }, { name: 'Lime Juice', amount: 3, unit: 'tbsp' }], instructions: ['Boil broth with lemongrass and galangal', 'Add mushrooms', 'Add shrimp and cook through', 'Season with fish sauce and lime', 'Garnish with cilantro'], nutrition: { calories: 180, protein: 22, carbs: 8, fat: 6, fiber: 2 }, tags: ['soup', 'thai', 'seafood'], rating: 4.6, reviewCount: 234 },
  { id: 19, title: 'Tiramisu', author: 'Chef Marco', cuisine: 'Italian', prepTime: 30, cookTime: 0, servings: 8, difficulty: 'Medium', ingredients: [{ name: 'Mascarpone', amount: 500, unit: 'g' }, { name: 'Espresso', amount: 300, unit: 'ml' }, { name: 'Ladyfingers', amount: 200, unit: 'g' }, { name: 'Eggs', amount: 4, unit: 'pcs' }, { name: 'Cocoa Powder', amount: 2, unit: 'tbsp' }], instructions: ['Brew and cool espresso', 'Whisk eggs with sugar', 'Fold in mascarpone', 'Dip ladyfingers in coffee', 'Layer and dust with cocoa, refrigerate 4 hours'], nutrition: { calories: 380, protein: 8, carbs: 32, fat: 26, fiber: 1 }, tags: ['dessert', 'italian', 'coffee'], rating: 4.8, reviewCount: 378 },
  { id: 20, title: 'Chicken Teriyaki', author: 'Chef Tanaka', cuisine: 'Japanese', prepTime: 10, cookTime: 15, servings: 2, difficulty: 'Easy', ingredients: [{ name: 'Chicken Thigh', amount: 400, unit: 'g' }, { name: 'Soy Sauce', amount: 4, unit: 'tbsp' }, { name: 'Mirin', amount: 2, unit: 'tbsp' }, { name: 'Sugar', amount: 2, unit: 'tbsp' }, { name: 'Rice', amount: 200, unit: 'g' }], instructions: ['Make teriyaki sauce', 'Pan-fry chicken until golden', 'Glaze with sauce', 'Cook until caramelized', 'Serve over steamed rice'], nutrition: { calories: 420, protein: 28, carbs: 48, fat: 12, fiber: 1 }, tags: ['chicken', 'japanese', 'quick'], rating: 4.5, reviewCount: 234 },
  { id: 21, title: 'Lasagna', author: 'Chef Marco', cuisine: 'Italian', prepTime: 30, cookTime: 45, servings: 8, difficulty: 'Medium', ingredients: [{ name: 'Lasagna Sheets', amount: 500, unit: 'g' }, { name: 'Ground Beef', amount: 500, unit: 'g' }, { name: 'Ricotta', amount: 400, unit: 'g' }, { name: 'Mozzarella', amount: 300, unit: 'g' }, { name: 'Marinara Sauce', amount: 600, unit: 'ml' }], instructions: ['Brown beef and add sauce', 'Mix ricotta with egg', 'Layer: sauce, noodles, ricotta, mozzarella', 'Repeat 3 times', 'Bake at 375°F for 45 min'], nutrition: { calories: 490, protein: 30, carbs: 38, fat: 24, fiber: 3 }, tags: ['pasta', 'italian', 'baked'], rating: 4.7, reviewCount: 412 },
  { id: 22, title: 'Gang Green Curry', author: 'Chef Somchai', cuisine: 'Thai', prepTime: 15, cookTime: 20, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Green Curry Paste', amount: 3, unit: 'tbsp' }, { name: 'Chicken', amount: 500, unit: 'g' }, { name: 'Coconut Milk', amount: 400, unit: 'ml' }, { name: 'Thai Basil', amount: 1, unit: 'cup' }, { name: 'Bamboo Shoots', amount: 200, unit: 'g' }], instructions: ['Fry curry paste in coconut cream', 'Add chicken and cook', 'Pour in remaining coconut milk', 'Add bamboo shoots', 'Finish with Thai basil'], nutrition: { calories: 380, protein: 26, carbs: 12, fat: 28, fiber: 3 }, tags: ['curry', 'thai', 'spicy'], rating: 4.6, reviewCount: 198 },
  { id: 23, title: 'Ceviche', author: 'Chef Carlos', cuisine: 'Mexican', prepTime: 20, cookTime: 0, servings: 4, difficulty: 'Easy', ingredients: [{ name: 'Fresh White Fish', amount: 500, unit: 'g' }, { name: 'Lime Juice', amount: 200, unit: 'ml' }, { name: 'Red Onion', amount: 1, unit: 'pc' }, { name: 'Cilantro', amount: 1, unit: 'bunch' }, { name: 'Jalapeño', amount: 1, unit: 'pc' }], instructions: ['Dice fish into small cubes', 'Cover with lime juice', 'Refrigerate 30 minutes', 'Drain most liquid', 'Mix with onion, cilantro, jalapeño'], nutrition: { calories: 160, protein: 28, carbs: 8, fat: 2, fiber: 2 }, tags: ['seafood', 'mexican', 'raw'], rating: 4.5, reviewCount: 178 },
  { id: 24, title: 'Chicken Wings Buffalo', author: 'Chef Jake', cuisine: 'American', prepTime: 10, cookTime: 45, servings: 4, difficulty: 'Easy', ingredients: [{ name: 'Chicken Wings', amount: 1, unit: 'kg' }, { name: 'Hot Sauce', amount: 120, unit: 'ml' }, { name: 'Butter', amount: 60, unit: 'g' }, { name: 'Celery', amount: 4, unit: 'stalks' }, { name: 'Blue Cheese Dressing', amount: 100, unit: 'ml' }], instructions: ['Pat wings dry, season with salt', 'Bake at 425°F for 45 min', 'Melt butter with hot sauce', 'Toss wings in sauce', 'Serve with celery and blue cheese'], nutrition: { calories: 420, protein: 32, carbs: 2, fat: 32, fiber: 1 }, tags: ['wings', 'american', 'spicy'], rating: 4.6, reviewCount: 345 },
  { id: 25, title: 'Mushroom Risotto', author: 'Chef Marco', cuisine: 'Italian', prepTime: 10, cookTime: 30, servings: 4, difficulty: 'Medium', ingredients: [{ name: 'Arborio Rice', amount: 300, unit: 'g' }, { name: 'Mushrooms', amount: 300, unit: 'g' }, { name: 'White Wine', amount: 150, unit: 'ml' }, { name: 'Parmesan', amount: 80, unit: 'g' }, { name: 'Vegetable Broth', amount: 1, unit: 'liter' }], instructions: ['Sauté mushrooms', 'Toast rice in butter', 'Deglaze with wine', 'Add warm broth one ladle at a time', 'Finish with butter and parmesan'], nutrition: { calories: 380, protein: 12, carbs: 52, fat: 14, fiber: 3 }, tags: ['risotto', 'italian', 'mushroom'], rating: 4.7, reviewCount: 267 }
];

// --- Static routes FIRST ---

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search, cuisine, difficulty, maxTime, minRating } = req.query;
  let filtered = [...recipes];
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || r.tags.some(t => t.includes(q))); }
  if (cuisine) filtered = filtered.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
  if (difficulty) filtered = filtered.filter(r => r.difficulty.toLowerCase() === difficulty.toLowerCase());
  if (maxTime) filtered = filtered.filter(r => (r.prepTime + r.cookTime) <= parseInt(maxTime));
  if (minRating) filtered = filtered.filter(r => r.rating >= parseFloat(minRating));
  const start = (page - 1) * limit;
  res.json({ recipes: filtered.slice(start, start + parseInt(limit)), total: filtered.length, page: parseInt(page), totalPages: Math.ceil(filtered.length / limit) });
});

router.get('/cuisines', (req, res) => {
  const cuisines = {};
  recipes.forEach(r => { cuisines[r.cuisine] = (cuisines[r.cuisine] || 0) + 1; });
  res.json({ cuisines: Object.entries(cuisines).map(([name, count]) => ({ name, count })) });
});

router.get('/cuisines/:cuisine', (req, res) => {
  const results = recipes.filter(r => r.cuisine.toLowerCase() === req.params.cuisine.toLowerCase());
  res.json({ cuisine: req.params.cuisine, count: results.length, recipes: results });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q (query) required' });
  const query = q.toLowerCase();
  const results = recipes.filter(r => r.title.toLowerCase().includes(query) || r.tags.some(t => t.includes(query)) || r.ingredients.some(i => i.name.toLowerCase().includes(query)));
  res.json({ query: q, count: results.length, recipes: results });
});

router.get('/top-rated', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({ limit, recipes: [...recipes].sort((a, b) => b.rating - a.rating).slice(0, limit) });
});

router.get('/quick', (req, res) => {
  const maxMinutes = parseInt(req.query.minutes) || 30;
  const results = recipes.filter(r => (r.prepTime + r.cookTime) <= maxMinutes);
  res.json({ maxMinutes, count: results.length, recipes: results });
});

router.get('/vegetarian', (req, res) => {
  const results = recipes.filter(r => r.tags.some(t => t.includes('vegetarian') || t.includes('vegan')));
  res.json({ count: results.length, recipes: results });
});

router.get('/stats', (req, res) => {
  const cuisineCounts = {};
  recipes.forEach(r => { cuisineCounts[r.cuisine] = (cuisineCounts[r.cuisine] || 0) + 1; });
  res.json({ totalRecipes: recipes.length, averageRating: (recipes.reduce((s, r) => s + r.rating, 0) / recipes.length).toFixed(2), averagePrepTime: Math.round(recipes.reduce((s, r) => s + r.prepTime, 0) / recipes.length), cuisines: cuisineCounts });
});

router.get('/tag/:tag', (req, res) => {
  const results = recipes.filter(r => r.tags.some(t => t.toLowerCase() === req.params.tag.toLowerCase()));
  res.json({ tag: req.params.tag, count: results.length, recipes: results });
});

router.get('/ingredients', (req, res) => {
  const ingredientCounts = {};
  recipes.forEach(r => r.ingredients.forEach(i => { ingredientCounts[i.name] = (ingredientCounts[i.name] || 0) + 1; }));
  res.json({ ingredients: Object.entries(ingredientCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count) });
});

router.post('/', (req, res) => {
  const recipe = { id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1, ...req.body };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// --- Parameterized routes: sub-routes FIRST, base LAST ---

router.get('/:id/nutrition', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json({ recipeId: recipe.id, title: recipe.title, servings: recipe.servings, nutrition: recipe.nutrition, perServing: { calories: Math.round(recipe.nutrition.calories / recipe.servings), protein: Math.round(recipe.nutrition.protein / recipe.servings), carbs: Math.round(recipe.nutrition.carbs / recipe.servings), fat: Math.round(recipe.nutrition.fat / recipe.servings), fiber: Math.round(recipe.nutrition.fiber / recipe.servings) } });
});

router.get('/:id/reviews', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json({ recipeId: recipe.id, title: recipe.title, averageRating: recipe.rating, totalReviews: recipe.reviewCount, reviews: [
    { id: 1, rating: 5, comment: 'Made this last night, absolutely delicious!', author: 'HomeCook', date: '2026-06-10T18:00:00Z' },
    { id: 2, rating: 4, comment: 'Great recipe, will make again.', author: 'FoodLover', date: '2026-06-11T12:30:00Z' }
  ]});
});

router.post('/:id/reviews', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.status(201).json({ id: Date.now(), recipeId: recipe.id, ...req.body, date: new Date().toISOString() });
});

router.get('/:id/timeline', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json({ recipeId: recipe.id, title: recipe.title, timeline: [
    { step: 1, action: 'Prep', duration: recipe.prepTime, description: 'Prepare ingredients' },
    { step: 2, action: 'Cook', duration: recipe.cookTime, description: 'Cook the dish' },
    { step: 3, action: 'Serve', duration: 5, description: 'Plate and serve' }
  ]});
});

router.post('/:id/rate', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  const { rating } = req.body;
  if (!rating) return res.status(400).json({ error: 'rating required' });
  recipe.rating = ((recipe.rating * recipe.reviewCount + rating) / (recipe.reviewCount + 1)).toFixed(1);
  recipe.reviewCount++;
  res.json({ recipeId: recipe.id, newRating: recipe.rating, reviewCount: recipe.reviewCount });
});

router.post('/:id/favorite', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json({ recipeId: recipe.id, favorited: true, userId: req.body.userId || 1 });
});

router.get('/:id/similar', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  const similar = recipes.filter(r => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.tags.some(t => recipe.tags.includes(t)))).slice(0, 5);
  res.json({ recipeId: recipe.id, similar });
});

router.post('/:id/scale', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  const { targetServings } = req.body;
  if (!targetServings) return res.status(400).json({ error: 'targetServings required' });
  const multiplier = targetServings / recipe.servings;
  res.json({ original: { title: recipe.title, servings: recipe.servings }, scaled: { title: recipe.title, servings: targetServings, ingredients: recipe.ingredients.map(i => ({ ...i, amount: Math.round(i.amount * multiplier * 100) / 100 })) } });
});

router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

router.put('/:id', (req, res) => {
  const idx = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });
  recipes[idx] = { ...recipes[idx], ...req.body, id: recipes[idx].id };
  res.json(recipes[idx]);
});

router.patch('/:id', (req, res) => {
  const idx = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });
  Object.assign(recipes[idx], req.body);
  res.json(recipes[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });
  const deleted = recipes.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
