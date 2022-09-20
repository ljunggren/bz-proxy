// Invoke 'strict' JavaScript mode
'use strict';

async function doIt(){
  console.log("START ......")
  // Load Common modules
  global.config = require('./config/config')
  const express = require('./express')

  express();
}
doIt()