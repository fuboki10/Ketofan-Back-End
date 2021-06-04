import { Request, Response } from 'express';
import status from 'http-status';
import { contactUsService } from '../services';

export const create = async (req: Request, res : Response) => {
  await contactUsService.create(req.body);

  const response = {
    status: status.CREATED,
    data: {
      message: 'Created Successfully',
    },
  };

  res.status(status.CREATED).json(response);
};

export const get = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const { contactUs, total } = await contactUsService.get(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: contactUs.length,
      total,
    },
    data: {
      contactUs,
    },
  };

  res.status(status.OK).json(response);
};

const contactUsController = {
  create,
  get,
};

export default contactUsController;
