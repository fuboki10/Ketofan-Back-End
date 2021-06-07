import { Request, Response } from 'express';
import { imageService } from '../services';

export const getById = async (req: Request, res : Response) => {
  const { id } : any = req.query;

  const imagePath = await imageService.getById(id);

  res.sendFile(imagePath);
};

const imageController = {
  getById,
};

export default imageController;
