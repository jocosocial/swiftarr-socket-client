import winston from "winston";

/**
 * Common logging constructor
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.logstash()),
  transports: [new winston.transports.Console({})],
});
