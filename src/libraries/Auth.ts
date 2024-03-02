import axios from "axios";
import {apiPOST, apiPrefix} from "./APIClient";
import {TokenStringData} from "./Structs/ControllerStructs";
import {logger} from "./Logging";

/**
 * Returns a set of HTTP authentication headers to present to the socket.
 * This is somewhat of an antipattern, apparently.
 * @param token Swiftarr Bearer token
 */
export const getAuthHeaders = (token: string) => {
  return {
    authorization: `Bearer ${token}`,
  };
};

export const getTokenData = async (serverUrl: string, username: string, password: string) => {
  const loginEndpoint = `${serverUrl}${apiPrefix}/auth/login`;
  apiPOST<TokenStringData>(loginEndpoint, {}, {
    auth: {
      username: username,
      password: password
    }
  }).then(data => {
    if (data) {
      // return data;
      logger.info(`Token is: ${data.token}`);
    }
  });
};
