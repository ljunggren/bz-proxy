'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');

exports.api={
  route:async function(req,res){
    let d=req.body

    axios(d).then(function (response) {
        res.send(response);
    }).catch(function (error) {
        console.log(error.message);
        res.status(400).send({status:400,message:error.message})
    });

  }
};