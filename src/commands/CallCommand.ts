import {buildSocket} from "../libraries/Socket";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import {parseCredential} from "../libraries/Auth";
import {v4 as uuidv4} from 'uuid';
import {apiPrefix} from "../libraries/Network/APIClient";

interface TCallCommandOpts {
  token: string;
  callee: string;
}

const execute = (program: TProgram, options: TCallCommandOpts) => {
  const callID = uuidv4();
  const wsUrl = `${program.opts().serverUrl}${apiPrefix}/phone/socket/initiate/${callID}/to/${options.callee}`;
  buildSocket(wsUrl, options.token);
};

export const setupCallCommand = (program: TProgram) => {
  program.command('call')
    .description('Start a pretend KrakenTalk call.')
    .option('-t, --token <string>', 'Auth token. Omit for an interactive prompt.')
    .requiredOption('-c, --callee <string>', 'ID of the user to call.')
    .action((options) => {
      const newOptions: TCallCommandOpts = {
        ...options,
        token: parseCredential(options.token),
      };
      execute(program, newOptions);
    });
};
