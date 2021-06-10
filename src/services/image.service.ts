import path from 'path';
import { Express } from 'express';
import { Image, ImageInterface } from '../models';
import deleteFileIfFound from './helpers/deleteFileIfFound';
import fileFound from './helpers/fileFound';

const DEFAULT_IMAGE_ID : number = 1;

export const getById = async (id : number | undefined) => {
  let image : ImageInterface[] = await Image.findById(id || DEFAULT_IMAGE_ID);

  if (!image || !image[0] || !await fileFound(image[0].filepath)) {
    image = await Image.findById(DEFAULT_IMAGE_ID);
  }

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

export const remove = async (id: number) : Promise<void> => {
  const image : ImageInterface[] = (await Image.db
    .returning('*')
    .where({ id })
    .delete());

  if (image && image[0]) deleteFileIfFound(image[0].filepath);
};

const imageService = {
  getById,
  add,
  remove,
};

export default imageService;
