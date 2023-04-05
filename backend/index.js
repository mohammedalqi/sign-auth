const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const RouteUser = require('./routes/User');
const mongoose = require('mongoose');
const cors = require ('cors');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// .then(res => {
//     console.log('database terhubung')
// })
// .catch (e => {
//     console.log('database gagal terhubung')
// })

// app.use(express.json());
// app.use('/', RouteUser)

// app.listen(process.env.PORT, (req,res) => {
//     console.log(`server run port ${process.env.PORT}`)

// })
.then(() => {
    console.log('Database terhubung');
  })
  .catch((err) => {
    console.error(err);
  });
  
app.use(cors())

  // Configure app middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  // Set up routes
  app.use('/', RouteUser);
  
  // Start the server
  const  PORT = process.env.PORT || 3456;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  
  
  