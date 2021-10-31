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
    
        let result = await axios.get(`https://wger.de/api/v2/exercise/?language=2&limit=10&category=${req.query.category}`);
        let data = result.data;
        //console.log(req.query);
        //console.log(`https://wger.de/api/v2/exercise/?language=2&limit=100&category=${req.query.category}`)

        var res_arr=result.data.results;

        res_arr.forEach((arrObj) => {
            delete arrObj['uuid'];
            delete arrObj['exercise_base'];
            delete arrObj['creation_date'];
            delete arrObj['category'];
            delete arrObj['equipment'].id;
            delete arrObj['muscles_secondary'];
            delete arrObj['license'];
            delete arrObj['language'];
            delete arrObj['license_author'];
            delete arrObj['variations'];
          });


        res.send(res_arr);
        
    } catch (error) {
        console.log(error.response);

    return error.response;
    }

   
}


wgr_request(req);

})