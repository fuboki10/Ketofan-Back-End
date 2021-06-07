import multer from 'multer';
import { Request } from 'express';
import AppError from '../utils/AppError';

const multerStorage = multer.diskStorage({
  destination: (req : Request, file : any, cb : Function) => {
    cb(null, 'uploads/albums');
  },
  filename: (req : Request, file : any, cb : Function) => {
    console.log(file);
    cb(null, file.filename);
  },
});

const multerFilter = (req : Request, file : any, cb : Function) => {
  if (file.mimetype.split('/')[1].match(/(png|jpg|jpeg)/)) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

export default multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
