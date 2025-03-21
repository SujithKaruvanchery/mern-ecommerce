require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const apiRouter = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express()

connectDB()

app.use(express.json())

app.use(cors({ origin: ["http://localhost:5173","https://mango-ecommerce-client-9sy1ifw2q-sujithkaruvancherys-projects.vercel.app"], credentials: true, methods: ["GET", "POST", "PUT","PATCH", "DELETE"] }));

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Backend is running on Vercel!");
});

app.use('/api', apiRouter)

app.all("*", (req, res) => {
    return res.status(404).json({ message: "Route not found" });
});


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Server listening on port ${process.env.PORT}`)
    }
})

console.log("PORT:", process.env.PORT);
console.log("MongoDB URL:", process.env.MONGO_URL);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
console.log("Client Domain:", process.env.CLIENT_DOMAIN);

