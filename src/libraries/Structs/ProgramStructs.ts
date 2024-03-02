import {Command, OptionValues} from "@commander-js/extra-typings";

export interface ProgramOptions extends OptionValues {
  serverUrl: string;
}

export type TProgram = Command<[], ProgramOptions>;
