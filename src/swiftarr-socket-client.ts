#!/usr/bin/env ts-node

import {Command} from '@commander-js/extra-typings';
import {setupListenCommand} from "./commands/ListenCommand";
import {setupLoginCommand} from "./commands/LoginCommand";
import {setupSchedImportCommand} from "./commands/SchedImportCommand";
import {ProgramOptions} from "./libraries/Structs/ProgramStructs";

const program = new Command<[], ProgramOptions>()
  .name('swiftarr-socket-client')
  .description('CLI for Swiftarr WebSocket events')
  .version('0.1.0')
  .requiredOption('-s, --server-url <string>', 'Server base URL including scheme.');

setupListenCommand(program);
setupLoginCommand(program);
setupSchedImportCommand(program);

program.parse();
