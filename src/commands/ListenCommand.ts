import {Command} from "@commander-js/extra-typings";
import {buildSocket} from "../libraries/Socket";

export const setupListenCommand = (program: Command) => {
  program.command('listen')
    .description('Start listening to a socket.')
    .requiredOption('-s, --server-url <string>', 'Server base URL including scheme.')
    .requiredOption('-t, --token <string>', 'Auth token.')
    .action((options) => {
      buildSocket(options.serverUrl, options.token);
    });
};
