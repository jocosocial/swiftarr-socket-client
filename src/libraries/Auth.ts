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
