/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import fs from 'fs';
import stream from 'stream';
import status from 'http-status';
import { imageService } from '../services';

export const getById = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const imagePath = await imageService.getById(id);

  const file = fs.createReadStream(imagePath);
  const ps = new stream.PassThrough();
  stream.pipeline(file, ps, (err) => {
    if (err) {
      return res.sendStatus(status.BAD_REQUEST);
    }
  });
  ps.pipe(res);
};

const imageController = {
  getById,
};

export default imageController;
