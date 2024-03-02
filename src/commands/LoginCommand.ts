import {getTokenData, parseCredential} from "../libraries/Auth";
import {TProgram} from "../libraries/Structs/ProgramStructs";

interface LoginCommandOptions {
  username: string;
  password?: string;
}

const execute = (options: LoginCommandOptions, program: TProgram) => {
  getTokenData(program.opts().serverUrl, options.username, parseCredential(options.password, 'password'));
};

export const setupLoginCommand = (program: TProgram) => {
  program.command('login')
    .description('Get a token from the Twitarr server.')
    .requiredOption('-u, --username <string>', 'Username.')
    .option('-p, --password <string>', 'Password. Or leave empty to be interactively prompted.')
    .action((options: LoginCommandOptions) => {
      execute(options, program);
    });
};
