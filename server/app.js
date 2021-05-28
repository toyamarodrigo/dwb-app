const express = require('express');
const cors = require('cors');
const router = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(3001, () => console.log('Express running on port 3001'));
