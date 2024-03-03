import {default as WebSocket} from "ws";
import ReconnectingWebSocket from "reconnecting-websocket";
import {getAuthHeaders} from "./Auth";
import {logger} from "./Logging";

/**
 * Custom constructor for the WebSocket class that accepts options
 * @param options
 * @constructor
 */
function WebSocketConstructor(options: { headers: { authorization: string; }; }) {
  return class extends WebSocket {
    constructor(url: string | URL, protocols: string | string[]) {
      super(url, protocols, options);
    }
  };
}

/**
 * Construct the WebSocket
 * @param socketUrl WebSocket URL endpoint.
 * @param token HTTP Bearer token
 */
export const buildSocket = (socketUrl: string, token: string) => {
  logger.info(`Connecting to socket at ${socketUrl}`);
  const socket = new ReconnectingWebSocket(socketUrl, [], {
    WebSocket: WebSocketConstructor({
      headers: getAuthHeaders(token),
    }),
    connectionTimeout: 10000,
    maxRetries: 20,
    minReconnectionDelay: 10000,
    maxReconnectionDelay: 30000,
    reconnectionDelayGrowFactor: 2,
  });

  socket.addEventListener('open', event => {
    logger.info('Socket opened successfully!');
  });

  socket.addEventListener('close', event => {
    logger.info('Socket has closed. Will reconnect shortly.');
  });

  socket.addEventListener('message', event => {
    logger.info('Socket has received a message!');
    logger.info(event.data);
  });

  socket.addEventListener('error', event => {
    logger.error(`Socket encountered an error: ${event.error}`);
  });
};
