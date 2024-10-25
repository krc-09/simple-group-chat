
const express = require('express');
const router = express.Router();
const fs = require('fs');
const app = express();

// Route to display chat messages and message input form
router.get('/', (req, res, next) => {
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
router.post("/", (req, res) => {
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
module.exports = router;