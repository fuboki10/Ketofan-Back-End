/* eslint-disable no-unused-vars */

import { Express } from 'express';
import { UserInterface } from '../../models';

declare module 'express-serve-static-core' {
   export interface Request {
        user: UserInterface;
        files: { [fieldname: string]: Express.Multer.File[]; };
    }
    export interface Response {
        user: any;
    }
}
