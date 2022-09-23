'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');

exports.api={
  route:async function(req,res){
    let d=req.body
    axios(d).then(function (response) {
      res.headers=response.headers
      res.status(response.status).send(response.data);
    }).catch(function (error) {
      console.log("Request:")
      console.log(d)
      console.log("Response error:")
      console.log(error.message);
      console.log(error)
      res.status(400).send({status:400,message:error.message})
    });

  }
};