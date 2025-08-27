const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

// enable cors
app.use(cors());
// enable json parser
app.use(express.json());

// route the customer api
const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Customers API !");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("✅ Server is successfully listening at port:", PORT);
    else
        console.error('❌ An error occurred:', error);
});

// connect to MongoDB
main().catch((error) => console.error(error));

async function main() {
    const connectionString = process.env.MONGODB_URL;
    mongoose.set('strictQuery', true);
    await mongoose.connect(connectionString);
    console.log("✅ MongoDB connected successfully!");
}
