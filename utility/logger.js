const winston = require('winston')
const combinedFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  );
  

const Logger = winston.createLogger({
        level: 'info',
        format:combinedFormat ,
        exitOnError:true,
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'Logs.log' })
        ]
})

Logger.SetConsoleLogger = function (){
    Logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
}

module.exports= {
"Logger": Logger,
}