import {getCalFeedFromUrl} from "../libraries/Network/SchedClient";
import {favoriteTwitarrEvent, getEventUid, getTwitarrEvents} from "../libraries/Schedule";
import {logger} from "../libraries/Logging";
import {TProgram} from "../libraries/Structs/ProgramStructs";
import {parseCredential} from "../libraries/Auth";

interface ImportCommandOptions {
  token: string;
  schedUsername: string;
  schedUrl: string;
}

const execute = async (options: ImportCommandOptions, program: TProgram) => {
  const schedUrl = `${options.schedUrl}/${options.schedUsername}.ics`;
  const schedEvents = await getCalFeedFromUrl(schedUrl);
  const twitarrEvents = await getTwitarrEvents(program.opts().serverUrl, options.token);
  for (const schedEvent of schedEvents) {
    const schedEventUid = getEventUid(schedEvent.uid);
    logger.info(`Processing event ${schedEventUid} (${schedEvent.summary}).`);
    const twitarrEvent = twitarrEvents.find(e => e.uid === schedEventUid);
    if (!twitarrEvent) {
      logger.warn(`No match for event ${schedEventUid} (${schedEvent.summary}).`);
      continue;
    }
    const twitarrEventID = twitarrEvent.eventID;
    await favoriteTwitarrEvent(program.opts().serverUrl, options.token, twitarrEventID);
  }
  logger.info('Done!');
};

export const setupSchedImportCommand = (program: TProgram) => {
  program.command('sched2twitarr')
    .description('Sync the Sched.com joined events with Twitarr favorited events.')
    .option('-t, --token <string>', 'Auth token. Omit for an interactive prompt.')
    .requiredOption('-u, --sched-username <string>', 'Sched.com username.')
    .option('--sched-url <string>', 'Sched.com event URL', 'https://jococruise2024.sched.com')
    .action((options) => {
      const newOptions: ImportCommandOptions = {
        ...options,
        token: parseCredential(options.token),
      };
      execute(newOptions, program);
    });
};
