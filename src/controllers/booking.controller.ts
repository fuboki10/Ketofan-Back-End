import { Request, Response } from 'express';
import status from 'http-status';
import { bookingsService } from '../services';

export const get = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const bookings = await bookingsService.get(id);

  const response = {
    status: status.OK,
    data: {
      bookings,
    },
  };

  res.status(status.OK).json(response);
};

const bookingController = {
  get,
};

export default bookingController;
