const dotenv=require('dotenv');
//var _ = require("lodash");
 const defaults =require("./env/defaults");
const node_env=(process.env.NODE_ENV||'development').trim();
// //var dev=(process.env.NODE_ENV||'development');

//const config = require('./env/'+node_env);

const config={};

// merge the default , the current one ie production  ,development and export it for use
//module.exports = _.merge({}, defaults, config);


module.exports=config;