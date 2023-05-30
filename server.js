
const express = require('express');
var cors = require('cors')
const connectDB = require('./config/db');
const path = require('path');


const app = express();


//connect Database
connectDB();
console.log("Crossed Connect DB");

//Init Middleware
app.use(express.json());
app.use(cors())

// app.get('/', (req, res) => res.send('API Running')); //Comment as this is default for port 5000 on express server side
console.log("reached Routes");
//Define Routes
app.use('/api/users/', require('./routes/api/users'));
// app.use('/api/organizations/', require('./routes/api/organizations'));
// app.use('/api/admin/', require('./routes/api/admin'));
app.use('/api/auth/', require('./routes/api/auth'));



console.log("Crossed routes & at Statics assignment");

//Underneat APIs: Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} //Testing for local running of instance

console.log("Passed Static assests");

// if (process.env.NODE_ENV === 'production') {
//     // app.use(express.static(path.join(__dirname, 'client/build')))
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     )
//     // } else {
//     //     app.get('/', (req, res) => {
//     //         res.send('API is running....')
//     //     })

//     // app.use(express.static(path.join(__dirname, 'client/build')))

//     // app.get('*', (req, res) =>
//     //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     // )
// }


const PORT = process.env.PORT || 5000;
console.log("passed PORT");
console.log("passed PORT" + PORT);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
