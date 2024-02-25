import winston from "winston";

/**
 * Common logging constructor
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});
