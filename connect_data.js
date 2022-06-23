const {Pool} = require('pg');


const pool = new Pool({
    connectionString: "postgres://nsczgxvnpzugxh:6780f49cacc3adaeafe8cbf3d3ce3b4a7a124c4930c5736647e9ff81c9334ece@ec2-52-72-99-110.compute-1.amazonaws.com:5432/d7hdqa9lad6l5f",
    ssl:{
        rejectUnauthorized: false
    }
})

module.exports = pool;