import {getTokenData, parseCredential} from "../libraries/Auth";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import * as os from "os";
import {logger} from "../libraries/Logging";

interface LoginCommandOptions {
  username: string;
  password?: string;
}

const execute = (options: LoginCommandOptions, program: TProgram) => {
  logger.info(`Logging in as ${options.username}`);
  getTokenData(program.opts().serverUrl, options.username, parseCredential(options.password, 'password'));
};

export const setupLoginCommand = (program: TProgram) => {
  program.command('login')
    .description('Get a token from the Twitarr server.')
    .option('-u, --username <string>', 'Username.', os.userInfo().username)
    .option('-p, --password <string>', 'Password. Omit for an interactive prompt.')
    .action((options: LoginCommandOptions) => {
      execute(options, program);
    });
};
