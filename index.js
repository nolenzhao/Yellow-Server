const express = require('express');
const cors = require('cors');
const pool = require('./connect_data');

const app = express();

app.use(cors());
app.use(express.json());

PORT = process.env.PORT || 5001;
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})

