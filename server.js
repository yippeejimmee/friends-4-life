const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Connect to localhost on port ${PORT}`));