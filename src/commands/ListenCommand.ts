import {buildSocket} from "../libraries/Socket";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import {parseCredential} from "../libraries/Auth";

export const setupListenCommand = (program: TProgram) => {
  program.command('listen')
    .description('Start listening to a socket.')
    .option('-t, --token <string>', 'Auth token. Omit for an interactive prompt.')
    .action((options) => {
      buildSocket(program.opts().serverUrl, parseCredential(options.token));
    });
};
