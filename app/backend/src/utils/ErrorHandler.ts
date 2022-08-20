export default class ErrorHandler extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
