import {buildSocket} from "../libraries/Socket";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import {parseCredential} from "../libraries/Auth";
import {v4 as uuidv4} from 'uuid';
import {apiPrefix} from "../libraries/Network/APIClient";
import {logger} from "../libraries/Logging";
import ReconnectingWebSocket from "reconnecting-websocket";

interface TCallCommandOpts {
  token: string;
  callee: string;
}

const sendPing = (socket: ReconnectingWebSocket) => {
    logger.info('Sending socket ping');
    const pingEvent = {
      type: 'ping',
      info: 'ping',
      contentID: uuidv4(),
    };
    logger.info(JSON.stringify(pingEvent))
    socket.send(JSON.stringify(pingEvent))
}

export const setupPingCommand = (program: TProgram) => {
  program.command('ping')
    .description('Ping the server.')
    .option('-t, --token <string>', 'Auth token. Omit for an interactive prompt.')
    .action((options) => {
      const wsUrl = `${program.opts().serverUrl}${apiPrefix}/notification/socket`;
      const socket = buildSocket(wsUrl, parseCredential(options.token));
        setInterval(() => sendPing(socket), 1000);
    });
};
