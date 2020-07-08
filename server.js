// Require
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

// Init
const app = express();

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
