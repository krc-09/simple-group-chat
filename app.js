const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const router = express.Router();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route for login form
app.get('/login', (req, res, next) => {
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value);" action="/" method="GET">
            <input id="username" type="text" name="username" placeholder="Enter Username">
            <button type="submit">Login</button>
        </form>
    `);
});

// Route to display chat messages and message input form
app.get('/', (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.log(err);
            data = 'No chat exists';
        }
        
        res.send(`
            ${data}
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input id="message" type="text" name="message" placeholder="Enter message">
                <input id="username" type="hidden" name="username">
                <button type="submit">Send</button>
            </form>
        `);
    });
});

// Route to handle form submission
app.post("/", (req, res) => {
    console.log(req.body.username),
    console.log(req.body.message)
    // Append the username and message to the file
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}\n`, { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});


// Mount the router
app.use(router);

// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
