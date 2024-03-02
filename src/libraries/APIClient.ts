import axios, {AxiosError} from "axios";
import {ErrorResponse} from "./Structs/ControllerStructs";
import {logger} from "./Logging";

export const apiPrefix = '/api/v3';

export async function apiPOST<
  TData,
>(endpoint: string, data = {}, config = {}) {
  try {
    const response = await axios.post<TData>(endpoint, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse: AxiosError<ErrorResponse> = error;
      logger.error(errorResponse.response? errorResponse.response.data.reason : errorResponse.message);
    } else {
      logger.error(error);
    }
  }
}
