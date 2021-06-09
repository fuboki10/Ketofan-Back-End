import status from 'http-status';
import crypto from 'crypto';
import knex from '../../db';
import {
  DoctorRequest, CreateDoctorRequestProps, DoctorRequestInterface, UserInterface, DoctorInterface,
} from '../models';
import AppError from '../utils/AppError';
import hashPassword from './helpers/hashPassword';
import mailService from './mail.service';
import workingDayService from './workingDay.service';
import logger from '../utils/logger';

const selectList = [
  'doctor_requests.*',
  'areas.name as area',
  'specializations.name as specialization',
];

const sendEmailWithPassword = async (user: UserInterface, password: string) => {
  const message = `Hello ${user.name}<br>
  Your request is approved<br>
  Your Password : ${password}<br>`;

  const mailOptions = {
    email: user.email,
    subject: 'Approved Request',
    message,
    button: 'SIGNIN',
    link: 'http://localhost:3000/api/v1/auth/signin',
  };

  mailService.sendEmail(mailOptions)
    .then(() => logger.info(`Sent Mail to ${user.email}`))
    .catch((error) => {
      const { code, response } = error;
      logger.error(`${code} : ${response.body.errors[0].message}`);
    });
};

const createDoctor = async (doctorRequest: DoctorRequestInterface) => {
  // generate password
  const password = crypto.randomBytes(8).toString('base64');

  // hash password
  const hashedPassword : String = await hashPassword(password);

  // create doctor
  const newUser = await knex.transaction(async (trx) => {
    const user : UserInterface[] = await trx('users').returning('*').insert({
      password: hashedPassword,
      email: doctorRequest.email,
      name: doctorRequest.name,
      gender: doctorRequest.gender,
      dateOfBirth: doctorRequest.dateOfBirth,
      verified: true,
      role: 'doctors',
    });

    const doctor : DoctorInterface[] = await trx('doctors').returning('*').insert({
      userId: user[0].id,
    });

    workingDayService.create(doctor[0].id);

    await trx('doctor_specializations').insert({
      doctorId: doctor[0].id,
      specializationId: doctorRequest.specializationId,
    });

    return user[0];
  });

  // send email with password
  sendEmailWithPassword(newUser, password);
};

export const create = async (doctorProps: CreateDoctorRequestProps) => {
  let doctorRequest : DoctorRequestInterface[] = await DoctorRequest.db
    .returning('*')
    .insert(doctorProps);

  doctorRequest = await DoctorRequest.db
    .select(selectList)
    .where('doctor_requests.id', doctorRequest[0].id)
    .join('areas', 'areas.id', '=', 'doctor_requests.areaId')
    .join('specializations', 'specializations.id', '=', 'doctor_requests.specializationId');

  return doctorRequest[0];
};

export const get = async (limit : number, offset : number) => {
  const [doctorRequests, total] : any = await Promise.all([
    DoctorRequest.find()
      .select(selectList)
      .offset(offset)
      .limit(limit)
      .join('areas', 'areas.id', '=', 'doctor_requests.areaId')
      .join('specializations', 'specializations.id', '=', 'doctor_requests.specializationId'),

    DoctorRequest.db.count(),
  ]);

  return { doctorRequests, total: parseInt(total[0].count, 10) };
};

export const reject = async (id: number) => {
  const request : any = await DoctorRequest.db
    .returning('*')
    .delete()
    .where({ id });

  if (!request || !request[0]) { throw new AppError('Request with the given id is not found', status.NOT_FOUND); }

  return request[0];
};

export const approve = async (id: number) => {
  const request : any = await DoctorRequest.db
    .returning('*')
    .delete()
    .where({ id });

  if (!request || !request[0]) { throw new AppError('Request with the given id is not found', status.NOT_FOUND); }

  await createDoctor(request[0]);

  return request[0];
};

const doctorRequestService = {
  create,
  get,
  reject,
  approve,
};

export default doctorRequestService;
