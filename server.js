const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo - promised based
mongoose
    .connect(db, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    .then(() => console.log(`MongoDB connected...`))
    .catch(err => console.log(err)); 

// use routes
app.use('/api/items', items);

// Serve static assets if in production
//if (process.env.NODE_ENV === 'production') {
    // set static folder
    //app.use(express.static('client/build'));
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
//}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));