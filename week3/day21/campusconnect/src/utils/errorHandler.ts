import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      return `API request failed with status ${error.response.status}`;
    }

    if (error.request) {
      return "No response received from the API";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
