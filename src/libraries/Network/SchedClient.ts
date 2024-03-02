import ical, {VEvent} from 'node-ical';

export const getCalFeedFromUrl = async (feedUrl: string) => {
  const icalResponse = await ical.async.fromURL(feedUrl);
  const events: VEvent[] = [];
  for (const event of Object.values(icalResponse)) {
    if (event.type == 'VEVENT') {
      events.push(event);
    }
  }
  return events;
};
