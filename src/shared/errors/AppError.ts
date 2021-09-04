import { ValidationError } from 'class-validator';

class Error {
  public readonly message: string | Array<ValidationError>;
  public readonly statusCode: number;

  constructor(message: string | Array<ValidationError>, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
