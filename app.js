const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const loginRoutes = require('./routes/login');
const messageRoutes = require('./routes/message');





// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));




app.use(loginRoutes);
app.use(messageRoutes);


// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
