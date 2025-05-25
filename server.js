const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer'); 
const path = require('path');

const app = express();
const port = 3000;

const upload = multer(); 

app.use(express.static(__dirname));

const db = new sqlite3.Database('order.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return; // Important: Stop if the database can't be opened
    }

    db.serialize(() => { // Ensure commands run sequentially
        db.run(`
            CREATE TABLE IF NOT EXISTS \`Order\` (
                id INTEGER PRIMARY KEY,
                product TEXT,
                image TEXT,
                name TEXT,
                email TEXT,
                address TEXT,
                tel TEXT,
                color TEXT,
                size INTEGER,
                total TEXT
            )`, (err) => {

            if (err) {
                console.error("Error creating table:", err.message);
                return;
            }
            console.log("Table created (if it didn't exist).");
        });

        db.run(`ALTER TABLE \`Order\` ADD COLUMN image TEXT`, (err) => {
            if (err) {
                if (err.message.includes("duplicate column name")) {
                    console.log("Column 'size' already exists. Skipping addition.");
                } else {
                    console.error("Error adding column 'size':", err.message);
                    return; // Stop if there's a real error
                }
            } else {
                console.log("Column 'size' added successfully.");
            }
        });
    });

    console.log('Database operations complete.'); // Log after serialize block
});


app.post('/submit', upload.none(), (req, res) => { 
    console.log("Request Body:", req.body);
    
    const product = req.body.product;
    const image = req.body.image;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const tel = req.body.tel;
    const color = req.body.color;
    const size = req.body.size;
    const total = req.body.total;
    //add size

    db.run('INSERT INTO \`Order\` (product, image, name, email, address, tel, color, size, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [product, image, name, email, address, tel, color, size, total], function(err) {
        if (err) {
        console.error("Database Error:", err.message);
        res.status(500).send('Error saving data.');
        } else {
        res.send('Data saved successfully! YAY');
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getOrders', (req, res) => {
    db.all('SELECT * FROM `Order`', [], (err, rows) => { // Select all orders
        if (err) {
            console.error("Error fetching orders:", err.message);
            res.status(500).json({ error: err.message }); // Send error as JSON
            return;
        }
        res.json(rows); // Send the order data as JSON
    });
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});