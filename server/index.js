const express = require('express');
require('dotenv').config();
const {graphqlHTTP} = require(
    'express-graphql'
)
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.js')
const schema = require('./schema/schema.js')
const port = process.env.PORT || 5000;
const app = express();
//db connection
connectDB();
//graphql middleware
app.use(cors());
app.use(
    '/graphql',graphqlHTTP({
        schema,
        graphiql : process.env.NODE_ENV == "dev",
    })
)
app.use(express.static(path.join(__dirname, './client/build')));
app.get(
    '*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    }
);
app.listen(port,()=>{
    console.log(`app started on port ${port}`)
})