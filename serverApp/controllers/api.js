'use strict';
process.env.ORA_SDTZ = 'UTC';
const axios = require('axios');
const https=require("https")
try{
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  axios.defaults.httpsAgent = httpsAgent
}catch(ex){
  console.log(ex.message)
}
exports.api={
  route:async function(req,res){
    let d=req.body
    prepareData(d)
    
    axios(d).then(function (response) {
      res.headers=response.headers
      res.status(response.status).send(response.data);
    }).catch(function (error) {
      console.log("Request:")
      console.log(d)
      console.log("Response error:")
      console.log(error.message);
      if(error.response){
        res.headers=error.response.headers
        res.statusText=error.response.statusText
        res.status(error.response.status).send(error.response.data)
      }else{
        console.log(error);
        res.status(error.status||500).send({message:error.message})
      }

    });

  }
};

function prepareData(d){
  console.log("Get request:")
  console.log(d)
  console.log("\n\n")
  let h=d.headers
  if(h&&h["Content-Type"]&&h["Content-Type"].includes("form")){
    var v=d.data
    var ds=[]

    _getDataList(v,"",ds)
    d.data=ds.join("&")
    console.log("Re-format data body from json to form:")
    console.log(d.data)
  }


  function _getDataList(v,ks,ds){
    if(v&&(v.constructor==Object||v.constructor==Array)){
      for(let k in v){
        _getDataList(v[k],ks?ks+"["+k+"]":k,ds)
      }
    }else{
      ds.push(encodeURIComponent(ks)+"="+encodeURIComponent(v))
    }
  }
}