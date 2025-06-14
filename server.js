const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const visitRoutes = require('./routes/visitRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.use('/api/customers', customerRoutes);
app.use('/api/visits', visitRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
 
