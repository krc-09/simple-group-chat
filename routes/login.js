const express = require('express');
const router = express.Router();


// Route for login form
router.get('/login', (req, res, next) => {
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value);" action="/" method="GET">
            <input id="username" type="text" name="username" placeholder="Enter Username">
            <button type="submit">Login</button>
        </form>
        `);
});


module.exports = router;