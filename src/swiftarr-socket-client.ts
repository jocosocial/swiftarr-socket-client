#!/usr/bin/env ts-node

import { Command } from '@commander-js/extra-typings';
import {buildSocket} from "./libraries/Socket";

const program = new Command();
program
  .name('swiftarr-socket-client')
  .description('CLI for Swiftarr WebSocket events')
  .version('0.0.0');

program.command('listen')
  .description('Start listening to a socket.')
  .requiredOption('-s, --server-url <string>', 'Server base URL including scheme.')
  .requiredOption('-t, --token <string>', 'Auth token.')
  .action((options) => {
    buildSocket(options.serverUrl, options.token);
  });

program.parse();
