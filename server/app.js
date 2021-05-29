const express = require('express');
const cors = require('cors');
const router = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express running on port ${port}`));
