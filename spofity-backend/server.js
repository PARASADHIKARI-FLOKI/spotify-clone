import express from 'express';
import cors from 'cors';
import "dotenv/config";
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
 

// App Config
const app = express();
const port = process.env.PORT || 8001;
connectDB();
connectCloudinary();



// Middlewares
app.use (express.json());
app.use(cors());


// initializing routes
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
