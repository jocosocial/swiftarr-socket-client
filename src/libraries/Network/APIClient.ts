import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../Structs/ControllerStructs";
import {logger} from "../Logging";
import * as https from "node:https";

export const apiPrefix = '/api/v3';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function apiPOST<
  TData,
>(endpoint: string, data = {}, config = {}) {
  try {
    const response = await axios.post<TData>(endpoint, data, {
      httpsAgent: agent,
      ...config,
    });
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

export async function apiGET<
  TData,
>(endpoint: string, config = {}) {
  try {
    const response = await axios.get<TData>(endpoint, {
      httpsAgent: agent,
      ...config,
    });
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
