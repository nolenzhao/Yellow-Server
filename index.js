const express = require('express');
const cors = require('cors');
const session_express = require('express-session');
const pgSession = require('connect-pg-simple')(session_express);
const cookie_parser = require('cookie-parser');
const pool = require('./connect_data');
const body_parser = require('body-parser');
const app = express();


const session_store = new pgSession({
    pool: pool,
    tableName: 'session',
})

const one_day = 1000 * 60 * 60 * 24

PORT = process.env.PORT || 5001;

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({
    extended: false,
}))
app.use(body_parser.urlencoded({
    extended: true,
}))
app.use(body_parser.json());

app.set('trust proxy',1)

app.use(session_express({
    store: session_store,
    secret: 'sophiesecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: one_day,
        sameSite: 'lax',
        secure: false,
    },
   
})) 


app.post('/cartpost', (req, res) =>{
    try{
          const {items} = req.body;
          console.log(items);
          req.session.items = items;
    }
    catch(err)
    {
        console.log(err);
    }
})


app.get('/shoppingcart', (req,res) =>{
    try{ 
        if(req.session.items)
        {
            console.log(req.session.items);
            res.send({message: req.session.items});
        }
        else{
            res.send({message: []})
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

app.get("/items/:id", async (req,res) =>{
    const {id} = req.params
    const one_img = await pool.query('SELECT * FROM items WHERE item_id = $1', [id])
    res.json(one_img.rows[0]);
})  





