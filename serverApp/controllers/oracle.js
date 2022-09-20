'use strict';
process.env.ORA_SDTZ = 'UTC';

const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('../../config/dbconfig.js');

// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
let libPath = config.ORACLE_LIB;;
// if (process.platform === 'win32') {           // Windows
//   libPath = config.ORACLE_LIB;
// } else if (process.platform === 'darwin') {   // macOS
//   libPath = process.env.HOME + '/Downloads/instantclient_21_6';
// }
if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}
exports.api={
  route:async function(req,res){
    let connection;
    try {
      let sql, binds, options, result;
      connection = await oracledb.getConnection(dbConfig);
  
      sql = req.body.sql;
      
      binds = {};
  
      // For a complete list of options see the documentation.
      options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        // extendedMetaData: true,               // get extra metadata
        // prefetchRows:     100,                // internal buffer allocation size for tuning
        // fetchArraySize:   100                 // internal buffer allocation size for tuning
      };
  
      result = await connection.execute(sql, binds, options);
  
      res.json({
        metaData:result.metaData,
        data:result.rows
      })
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }    
  }
};