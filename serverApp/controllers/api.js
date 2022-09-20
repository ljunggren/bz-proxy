'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');

exports.api={
  route:async function(req,res){
    let d=req.body

    axios(d).then(function (response) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });

  }
};