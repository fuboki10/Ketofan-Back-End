import path from 'path';
import status from 'http-status';
import { Express } from 'express';
import { Image } from '../models';
import AppError from '../utils/AppError';

export const getById = async (id : number) => {
  const image = await Image.findById(id);

  if (!image || !image[0]) { throw new AppError('Image with the given id is not found', status.NOT_FOUND); }

  const dirname = path.resolve();
  const imagePath = path.join(dirname, image[0].filepath);

  return imagePath;
};

export const add = async (file : Express.Multer.File) => {
  const {
    filename, mimetype, size,
  } = file;

  const filepath = file.path;

  const image : any = await Image.db
    .returning('*')
    .insert({
      filename, filepath, mimetype, size,
    });

  return image[0].id;
};

const imageService = {
  getById,
  add,
};

export default imageService;
