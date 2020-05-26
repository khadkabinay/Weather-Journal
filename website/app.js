        
        //define api key and baseUrl as well as other  variable
        const baseUrl       = 'http://api.openweathermap.org/data/2.5/weather?zip=';
        const apiKey        = ',us&appid=aa8cfcd8d005e411efb192da9b6eaa9f';
        let tempUnit        = '&units=imperial';
        let Fahrenheit      = ' °F';


        // click event on generate button 
        const generator_btn = document.getElementById("generate");
        generator_btn.addEventListener("click", tempFeelingTeller);
        
        
        
        // generate new date
        const dateGenerator = () => {
                let d        = new Date()
                let month    = d.getMonth() 
                let date     = d.getDate()
                let year     = d.getFullYear()
                let fullDate = ` ${month + 1}/${date}/${year}`
            return fullDate;

            }

        
        // define a function that is called when generate button is clicked with chaining promises 
          function tempFeelingTeller(event){
                    event.preventDefault()
            // input fields
                let  zipCode     = document.getElementById('zip').value
                let  feelings    =  document.getElementById('feelings').value
                let errorContent = document.getElementById('error-content')
                let fullUrl      = ''

                // asigning dateGenerator functon to a variable 
                    let date    = dateGenerator();

                //  zip and feelings have to be filled out
                
                if(zipCode && feelings){
                    
                    //check if zipcode is number
                    if(!Number(zipCode)){
                    
                        errorContent.innerHTML += "Please! Zip code must be number"
                    }else if (zipCode.toString().length < 5 || zipCode.toString().length > 5){
                        
                        errorContent.innerHTML += "Please! Zip code must be 5 numbers"

                    }else{

                        fullUrl   += baseUrl + zipCode + apiKey + tempUnit
                    
                        // fetch data from weather api
                        getTemperate(fullUrl)
                        
                        .then( (data)=>{
                        //asigning fetched data to a variable 
                            let weatherData  = data
                            let tempWithUnit = `${Math.floor(weatherData.main.temp)} ${Fahrenheit}`
                    
                        // add an object as post route to server
                        postData('/addFeelWith', {temp:tempWithUnit, feel:feelings ,date:date} );
                
                        //fetch all data from server and update into dom 
                        updateUI();
                    })};

                }
                //check if either of input is not filled 
                else if (!zipCode && !feelings){
                    errorContent.innerHTML = "Something went wrong! Please try again !!"
                    
                } else if(!feelings){
                    errorContent.innerHTML += "Please ! Say something about your feeling"

                } else if(!zipCode){
                errorContent.innerHTML += "Please! Enter your zip code"
                } 
                
            };
            
            


        
        // define fetch for api call
        const getTemperate  = async (url) =>{

            const response = await fetch(url)
                try{
                    const weatherData = await response.json()
                    return weatherData;
                
                }catch(error){
                    console.log("error", error)
                }
            };
        
        
        
        
        // postData function define
        
        const postData = async (url = " ", data = {})=>{

            const response = await fetch(url,{
                method:"POST",
                credentials: "same-origin",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
        
                });
        
                try {
                    const newData = await response.json();
                return newData;
                
                }catch(error){
                console.log("error", error)
                }
                
            };
        
        
        
        
        
        // updateUI function define
        const updateUI = async ()=> {
            // fetch all data from endpoint object
            const request = await fetch('/all')
            
            try{
                //update to the dom dynamically
                    const allData = await request.json();
                    document.getElementById('temp').innerHTML    = ` ${allData.temp}`;
                    document.getElementById('date').innerHTML    = ` ${allData.date}`;
                    document.getElementById('content').innerHTML = ` ${allData.feelings}`;
        
            }catch(error){
                console.log("error",  error);
        }
        };




        
