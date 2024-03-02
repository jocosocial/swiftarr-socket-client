import {Command} from "@commander-js/extra-typings";
import {getCalFeedFromUrl} from "../libraries/Network/SchedClient";
import {favoriteTwitarrEvent, getEventUid, getTwitarrEvents} from "../libraries/Schedule";
import {logger} from "../libraries/Logging";

interface ImportCommandOptions {
  serverUrl: string;
  token: string;
  schedUsername: string;
  schedUrl: string;
}

const execute = async (options: ImportCommandOptions) => {
  const schedUrl = `${options.schedUrl}/${options.schedUsername}.ics`;
  const schedEvents = await getCalFeedFromUrl(schedUrl);
  const twitarrEvents = await getTwitarrEvents(options.serverUrl, options.token);
  for (const schedEvent of schedEvents) {
    const schedEventUid = getEventUid(schedEvent.uid);
    logger.info(`Processing event ${schedEventUid} (${schedEvent.summary}).`);
    const twitarrEvent = twitarrEvents.find(e => e.uid === schedEventUid);
    if (!twitarrEvent) {
      logger.warn(`No match for event ${schedEventUid} (${schedEvent.summary}).`);
      continue;
    }
    const twitarrEventID = twitarrEvent.eventID;
    await favoriteTwitarrEvent(options.serverUrl, options.token, twitarrEventID);
  }
  logger.info('Done!');
};

export const setupSchedImportCommand = (program: Command) => {
  program.command('sched2twitarr')
    .description('Sync the Sched.com joined events with Twitarr favorited events.')
    .requiredOption('-s, --server-url <string>', 'Server base URL including scheme.')
    .requiredOption('-t, --token <string>', 'Auth token.')
    .requiredOption('-u, --sched-username <string>', 'Sched.com username.')
    .option('--sched-url <string>', 'Sched.com event URL', 'https://jococruise2024.sched.com')
    .action((options) => {
      execute(options);
    });
};
