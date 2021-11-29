
const express = require('express');
var cors = require('cors')
const connectDB = require('./config/db');
const path = require('path');


const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

// app.get('/', (req, res) => res.send('API Running')); //Comment as this is default for port 5000 on express server side

//Define Routes
app.use('/api/users/', require('./routes/api/users'));
// app.use('/api/organizations/', require('./routes/api/organizations'));
// app.use('/api/admin/', require('./routes/api/admin'));

app.use('/api/auth/', require('./routes/api/auth'));





//Underneat APIs: Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


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

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
