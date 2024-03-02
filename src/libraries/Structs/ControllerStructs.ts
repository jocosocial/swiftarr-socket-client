import {UserAccessLevel} from "../Enums/UserAccessLevel";

/**
 * All of these interfaces come from Swiftarr.
 * https://github.com/jocosocial/swiftarr/blob/master/Sources/App/Controllers/Structs/ControllerStructs.swift
 */
export interface TokenStringData {
  /// The user ID of the newly logged-in user.
  userID: string;
  /// The user's access level.
  accessLevel: UserAccessLevel;
  /// The token string.
  token: string;
}

export interface ErrorResponse {
  /// Always `true` to indicate this is a non-typical JSON response.
  error: boolean;
  /// The HTTP status code.
  status: number;
  /// The reason for the error. Displayable to the user.
  reason: string;
  /// Optional dictionary of field errors; mostly used for input JSON validation failures. A request with JSON content that fails validation may have field-level errors here,
  /// keyed by the keypath to the fields that failed validation.
  fieldErrors?: string | string[];
}

export interface EventData {
  /// The event's ID. This is the Swiftarr database record for this event.
  eventID: string;
  /// The event's UID. This is the VCALENDAR/ICS File/sched.com identifier for this event--what calendar software uses to correllate whether 2 events are the same event.
  uid: string;
  /// The event's title.
  title: string;
  /// A description of the event.
  description: string;
  /// Starting time of the event
  startTime: string;
  /// Ending time of the event.
  endTime: string;
  /// The timezone that the ship is going to be in when the event occurs. Delivered as an abbreviation e.g. "EST".
  timeZone: string;
  /// The timezone ID that the ship is going to be in when the event occurs. Example: "America/New_York".
  timeZoneID: string;
  /// The location of the event.
  location: string;
  /// The event category.
  eventType: string;
  /// The last time data for this event was modified. Used for change management.
  lastUpdateTime: string;
  /// The event's associated `Forum`.
  forum?: string;
  /// Whether user has favorited event.
  isFavorite: boolean;
}
