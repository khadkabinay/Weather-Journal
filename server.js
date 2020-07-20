
        // serve as an endpoint data

        let projectData = {};


        // Require Express to run server and routes
        const express = require('express');
        const path    = require("path");
        require('dotenv').config()


        /* Start up an instance of app */
        const app = express();


        /* Middleware*/
        //Here we are configuring express to use body-parser as middle-ware.
        const fetch      = require("node-fetch");
        const bodyParser = require('body-parser')
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());


        // Cors for cross origin allowance
        const cors = require('cors');
        app.use(cors());


        // Initialize the main project folder
        app.use(express.static(path.join(__dirname ,'website')));


        // Setup Server
        const PORT   = process.env.PORT || 8080
        const server =  app.listen(PORT, listening);
        
        function listening(){
            console.log(`server is running on localhost:${PORT}`);
        };




        // add api fetched data and feelings into an object

        app.post('/addFeelWith', addTempToObj);

        function addTempToObj(req,res){
          
          // data coming as post request asigned to an object
         let newEntry = {temp: req.body.temp,
                      feelings: req.body.feel,
                      date:req.body.date
                        }
        // asigning newEntry object to endpoint object named projectData
          projectData = newEntry;
            res.send(projectData)
         };
        



        // send end point object where it is fetched 
        app.get("/all", getFeelingsWethData);

        function getFeelingsWethData(req,res){
                    res.send(projectData)

        };

