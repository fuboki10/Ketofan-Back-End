import { Request, Response } from 'express';
import status from 'http-status';
import { doctorRequestService, imageService } from '../services';
import AppError from '../utils/AppError';
import deleteFileIfFound from '../services/helpers/deleteFileIfFound';

export const create = async (req: Request, res: Response) => {
  const { profileImageFile, documentFile } = req.files;

  if (!profileImageFile) {
    if (documentFile && documentFile[0]) deleteFileIfFound(documentFile[0].path);
    throw new AppError('Profile Image is Not Found', status.NOT_FOUND);
  }

  if (!documentFile) {
    if (profileImageFile && profileImageFile[0]) deleteFileIfFound(profileImageFile[0].path);
    throw new AppError('Document is Not Found', status.NOT_FOUND);
  }

  const [profileImage, document] = await Promise.all([
    imageService.add(profileImageFile[0]),
    imageService.add(documentFile[0]),
  ]);

  const doctorRequest = await doctorRequestService.create({ ...req.body, profileImage, document });

  const response = {
    status: status.OK,
    data: {
      doctorRequest,
    },
  };

  res.status(status.OK).json(response);
};

export const get = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const { doctorRequests, total } = await doctorRequestService.get(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: doctorRequests.length,
      total,
    },
    data: {
      doctorRequests,
    },
  };

  res.status(status.OK).json(response);
};

export const approve = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  await doctorRequestService.approve(id);

  const response = {
    status: status.OK,
    data: {
      message: 'Approved',
    },
  };

  res.status(status.OK).json(response);
};

export const reject = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  await doctorRequestService.reject(id);

  const response = {
    status: status.OK,
    data: {
      message: 'Rejected',
    },
  };

  res.status(status.OK).json(response);
};

const doctorRequestController = {
  create,
  get,
  approve,
  reject,
};

export default doctorRequestController;
