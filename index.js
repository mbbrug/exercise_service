const express = require('express');
var cors = require('cors')

 
const axios = require('axios');
const url = require('url');
var app = express()

app.use(cors())

app.use(express.json());


app.get('/', (req, res)=>{
    
    res.json({"Message":"Please use the /exercise endpoint to request exercise data"});
})

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));

app.get('/exercise', (req, res) => {
    

async function wgr_request(req) {
    try {

        var cat = req.query.category;
        var cat_id = 10;

        if(cat == 'Abs'){
            cat_id =10;
        }else if( cat == 'Arms'){
            cat_id=8;
        }else if( cat == 'Back'){
            cat_id=12;
        }else if( cat == 'Calves'){
            cat_id=14;
        }else if( cat == 'Chest'){
            cat_id=11;
        }else if( cat == 'Legs'){
            cat_id=9;
        }else if( cat == 'Shoulders'){
            cat_id=13;
        };
    
        let result = await axios.get(`https://wger.de/api/v2/exercise/?language=2&limit=30&category=${cat_id}`);
        let data = result.data;
 

        //var res_arr=result.data.results;

        // res_arr.forEach((arrObj) => {
        //     delete arrObj['uuid'];
        //     delete arrObj['exercise_base'];
        //     delete arrObj['creation_date'];
        //     delete arrObj['category'];
        //     delete arrObj['equipment'].id;
        //     delete arrObj['muscles_secondary'];
        //     delete arrObj['license'];
        //     delete arrObj['language'];
        //     delete arrObj['license_author'];
        //     delete arrObj['variations'];
        //   });


        res.send(data);
        
    } catch (error) {
        console.log(error.response);

    return error.response;
    }

   
}


wgr_request(req);

})