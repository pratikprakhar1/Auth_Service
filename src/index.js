const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
//const UserRepository = require('./repository/user-repository');
//const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    
    app.listen(PORT,async () => {
        console.log(`Server Started on Port: ${PORT}`);
        
        //const service = new UserService();
        // const newToken = service.createToken({
        //     email:'admin@email.com',
        //     id : 1
        // })
        // console.log(newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2OTM1NDIwNTcsImV4cCI6MTY5MzYyODQ1N30.7Ow-fV8RQc6YBWzSTcDj10o6I-3-Fe59g2V9jjD0Hz8';
        // const response = service.verifyToken(token);
        // console.log(response);
    })
}

prepareAndStartServer();