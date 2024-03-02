import {Command} from "@commander-js/extra-typings";
import {getTokenData} from "../libraries/Auth";

interface LoginCommandOptions {
  serverUrl: string;
  username: string;
  password: string;
}

const execute = (options: LoginCommandOptions) => {
  getTokenData(options.serverUrl, options.username, options.password);
};

export const setupLoginCommand = (program: Command) => {
  program.command('login')
    .description('Get a token from the Twitarr server.')
    .requiredOption('-s, --server-url <string>', 'Server base URL including scheme.')
    .requiredOption('-u, --username <string>', 'Username.')
    .requiredOption('-p, --password <string>', 'Password.')
    .action((options: LoginCommandOptions) => {
      execute(options);
    });
};
