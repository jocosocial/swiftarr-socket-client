#!/usr/bin/env ts-node

import { Command } from '@commander-js/extra-typings';
import {setupListenCommand} from "./commands/ListenCommand";
import {setupLoginCommand} from "./commands/LoginCommand";

const program = new Command();
program
  .name('swiftarr-socket-client')
  .description('CLI for Swiftarr WebSocket events')
  .version('0.0.0');

setupListenCommand(program);
setupLoginCommand(program);

program.parse();
