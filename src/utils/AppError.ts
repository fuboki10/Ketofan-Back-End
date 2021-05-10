/**
 * @author Abdelrahman Tarek
 * @class
 * @extends {Error}
 */
export default class AppError extends Error {
  statusCode : number;

  status: string;

  isOperational: boolean;

  /**
   * @constructor
   * @author Abdelrahman Tarek
   * @param {String} message Error message
   * @param {Number} statusCode Error status code
   * @param {Boolean} [isOperational=true] `true` if the error is operational
   * @param {String} [stack] Error stack
   */
  constructor(message : string, statusCode : number, isOperational : boolean = true, stack : string = '') {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
