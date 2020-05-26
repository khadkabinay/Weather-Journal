
        // serve as an endpoint 

        const projectData = [];


        // Require Express to run server and routes
        const express = require('express');
        const path    = require("path");


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
        const port   = 3000
        const server =  app.listen(port, listening);
        
        function listening(){
            console.log(`server is running on localhost:${port}`);
        };




        // add api fetched data and feelings into an object

        app.post('/addFeelWith', addTempToObj);

        function addTempToObj(req,res){
          

          newEntry = {temp: req.body.temp,
                      feelings: req.body.feel,
                      date:req.body.date
                        }
          
          projectData.push(newEntry)
            res.send(projectData)
         };
        



        // send end point data to static website
        app.get("/all", getFeelingsWethData);

        function getFeelingsWethData(req,res){
                    res.send(projectData)

        };

