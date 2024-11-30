const express = require('express');
const mongoose = require('mongoose')
const userRouter = require('./router/user')
const empRouter = require('./router/emp')
const SERVER_PORT = process.env.NODE_ENV || 5001;
const cors = require('cors');


const app = express();
const DB_URL = "mongodb+srv://admin:pass@cluster0.nnsxa.mongodb.net/AssignmentTwo?retryWrites=true&w=majority&appName=Cluster0"

mongoose.Promise = global.Promise;

const corsOptions = {
    origin: 'http://localhost:3000', // Allow only frontend's localhost
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsOptions));


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', empRouter);


app.listen(SERVER_PORT, ()=>{
    console.log(`Server is running on port: ${SERVER_PORT}`)
})