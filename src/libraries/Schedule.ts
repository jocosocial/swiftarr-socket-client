import {apiGET, apiPOST, apiPrefix} from "./Network/APIClient";
import {EventData} from "./Structs/ControllerStructs";

export const getTwitarrEvents = async (serverUrl: string, token: string) => {
  const endpoint = `${serverUrl}${apiPrefix}/events`;
  const response = await apiGET<EventData[]>(endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response || [];
};

export const favoriteTwitarrEvent = async (serverUrl: string, token: string, eventID: string) => {
  const endpoint = `${serverUrl}${apiPrefix}/events/${eventID}/favorite`;
  await apiPOST(endpoint, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getEventUid = (eventUid: string) => {
  if (eventUid.includes('@')) {
    return eventUid.split('@')[0];
  }
  return eventUid;
};
