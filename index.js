const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests, please try again later' }
});
app.use('/api/', limiter);

// Load OpenAPI spec
let swaggerDoc;
try {
  swaggerDoc = yaml.load(fs.readFileSync('./config/openapi.yaml', 'utf8'));
} catch (e) {
  swaggerDoc = { openapi: '3.0.0', info: { title: 'API', version: '1.0.0' }, paths: {} };
}

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Mount routes
const systemRoutes = require('./routes/system');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const apiManagementRoutes = require('./routes/api-management');
const movieRoutes = require('./routes/movies');
const bookRoutes = require('./routes/books');
const weatherRoutes = require('./routes/weather');
const countryRoutes = require('./routes/countries');
const recipeRoutes = require('./routes/recipes');
const carRoutes = require('./routes/cars');

app.use('/api/v1/system', systemRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/api-management', apiManagementRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/countries', countryRoutes);
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/cars', carRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Zombie APIs Research API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/api/v1/system/health'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.path} not found` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
