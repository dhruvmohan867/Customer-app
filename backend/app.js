const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = 3000;

// enable cors
app.use(cors());
// enable json parser
app.use(express.json());

// route the customer api
const customerRoutes = require('./routes/customers');
// use the route
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Customers API !")
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully listening at port:", PORT);
    else
        console.error('An error occurred:', error);
});

main().catch((error) => console.error(error));

async function main() {
    // prepre conn string
    const connectionString = "your_mongo_db_connection_string_here";
    await mongoose.connect(connectionString);
    mongoose.set('strictQuery', true);
}