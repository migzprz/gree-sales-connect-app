const express = require('express');
const router = express.Router();

module.exports = (query) => {

    router.post('/login', async (req, res) => {
        const password = req.body.password;
        const username = req.body.username;
    
        const loginQuery = `SELECT * FROM md_login WHERE username = '${username}' AND is_active = 1`;
    
        try {
            const results = await query(loginQuery);
            console.log('Results:', results); // Add this console log to see what data is being fetched from the database
            if (results.length === 0) {
                console.log('No user found with username:', username); // Add this console log to see if the username exists
                res.status(500).json("Wrong Username or Password");
            } else {
                const { login_id, first_name, last_name, role, aftersales_access, sales_access, exec_access, sysad_access, password: storedPassword } = results[0];
                console.log('Stored Password:', storedPassword); // Add this console log to see the stored password
                if (password === storedPassword) {
                    req.session.user = {
                        login_id,
                        first_name,
                        last_name,
                        role,
                        sales_access,
                        aftersales_access,
                        exec_access,
                        sysad_access,
                    };
                    
                    console.log('User logged in:', req.session.user); // Add this console log to see the user object
                    res.json({ message: "Login successful", user: req.session.user });
                } else {
                    console.log('Incorrect password for username:', username); // Add this console log to see if the password is incorrect
                    res.status(500).json("Wrong Username or Password");
                }
            }
        } catch (error) {
            console.error('Error during password comparison:', error);
            res.status(500).json("Login Failed");
        }
    });

    router.get('/logout', (req, res) => {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            // Redirect to login page or any other appropriate action after logout
        });
    });
    
    


    return router;
}