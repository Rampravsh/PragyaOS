import { AppError } from "../../common/errors/appError";
import { HttpStatus, HttpStatusCode } from "@pragyaos/constants";

export class SearchProviderError extends AppError {
  constructor(message: string, statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR, details?: any) {
    super(statusCode, `Search Provider Error: ${message}`, details);
  }

  public static connectionFailed(message: string): SearchProviderError {
    return new SearchProviderError(`Failed to connect to search service: ${message}`, HttpStatus.SERVICE_UNAVAILABLE);
  }

  public static indexOperationFailed(index: string, message: string): SearchProviderError {
    return new SearchProviderError(`Index operation on "${index}" failed: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
