/* eslint-disable no-unused-vars */

interface CustomFile {

}

declare namespace Express {
  export interface Request {
      user: any;
      files: { [fieldname: string]: Express.Multer.File[]; };
  }
  export interface Response {
      user: any;
  }
}
