import {buildSocket} from "../libraries/Socket";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import {parseCredential} from "../libraries/Auth";
import {apiPrefix} from "../libraries/Network/APIClient";

export const setupListenCommand = (program: TProgram) => {
  program.command('listen')
    .description('Start listening to a socket.')
    .option('-t, --token <string>', 'Auth token. Omit for an interactive prompt.')
    .action((options) => {
      const wsUrl = `${program.opts().serverUrl}${apiPrefix}/notification/socket`;
      buildSocket(wsUrl, parseCredential(options.token));
    });
};
