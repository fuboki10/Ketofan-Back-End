import multer from 'multer';
import { Express, Request } from 'express';
import AppError from '../utils/AppError';

const multerStorage = multer.diskStorage({
  destination: (req : Request, file : Express.Multer.File, cb : Function) => {
    cb(null, 'public/images');
  },
  filename: (req : Request, file : Express.Multer.File, cb : Function) => {
    cb(null, `${new Date().valueOf()}_${file.originalname.replace(/ /g, '_')}`);
  },
});

const multerFilter = (req : Request, file : Express.Multer.File, cb : Function) => {
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
