'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');

exports.api={
  route:async function(req,res){
    let d=req.body
    console.log(d)
    axios(d).then(function (response) {
      console.log(res.headers)
      res.headers=response.headers
      console.log(res.headers)
      res.status(response.status).send(response.data);
    }).catch(function (error) {
      console.log(error.message);
      res.status(400).send({status:400,message:error.message})
    });

  }
};