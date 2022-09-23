'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');

exports.api={
  route:async function(req,res){
    let d=req.body
    console.log(d)
    axios(d).then(function (response) {
      res.send({
        status:response.status,
        data:response.data
      });
      console.log(response)
    }).catch(function (error) {
      console.log(error.message);
      res.status(400).send({status:400,message:error.message})
    });

  }
};