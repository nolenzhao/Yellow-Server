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


app.get("/items/:id", async (req,res) =>{
    const {id} = req.params
    const one_img = await pool.query('SELECT * FROM items WHERE item_id = $1', [id])
    res.json(one_img.rows[0]);
})


