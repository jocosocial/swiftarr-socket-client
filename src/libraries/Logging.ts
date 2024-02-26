import winston from "winston";

/**
 * Log format. This came straight from their own documentation at
 * https://github.com/winstonjs/logform#readme
 */
const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

/**
 * Common logging constructor
 */
export const logger = winston.createLogger({
  level: 'info',
  format: alignedWithColorsAndTime,
  transports: [new winston.transports.Console({})],
});
