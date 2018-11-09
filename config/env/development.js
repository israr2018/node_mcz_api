const config = {
    port:process.env.PORT || 4000,
    ACAO:"http://localhost:4200",
    database: {
      debug: true,
      connection:'mongodb://israr.mcz:Computer2018@ds157223.mlab.com:57223/mcz_db'
      
    },
    logger: {
      level: "debug",
      format: 'combined'
    },
   
  };
  
  module.exports = config;