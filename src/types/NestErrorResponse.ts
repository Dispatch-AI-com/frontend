// This file contains the definition of the NestErrorResponse interface.
// It is used to define the structure of the error response from the NestJS backend.
export interface NestErrorResponse {
  statusCode: number;
  message: string[];
  error: string;
}