import status from 'http-status';
import knex from '../../db';
import {
  DoctorRequest, CreateDoctorRequestProps, DoctorRequestInterface, UserInterface, DoctorInterface,
} from '../models';
import AppError from '../utils/AppError';
import hashPassword from './helpers/hashPassword';
import mailService from './mail.service';
import workingDayService from './workingDay.service';
import logger from '../utils/logger';
// eslint-disable-next-line import/order
import config = require('config');

const selectList = [
  'doctor_requests.*',
  'areas.name as area',
  'specializations.name as specialization',
];

const sendEmailWithPassword = async (user: UserInterface, password: string) => {
  const message = `Hello ${user.name}<br>
  Your request is approved<br>
  Your Password :  <code style="
  background-color: rgb(246, 246, 246);
  padding: 3px;
">${password}</code><br>`;

  const mailOptions = {
    email: user.email,
    subject: 'Approved Request',
    message,
    button: 'SIGNIN',
    link: `${process.env.WEBSITE || config.get('WEBSITE')}/login`,
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
  const password = Math.random().toString(36).slice(2)
  + Math.random().toString(36)
    .toUpperCase().slice(2);

  // hash password
  const hashedPassword : String = await hashPassword(password);

  // create doctor
  return knex.transaction(async (trx) => {
    const user : UserInterface[] = await trx('users').returning('*').insert({
      password: hashedPassword,
      email: doctorRequest.email,
      name: doctorRequest.name,
      gender: doctorRequest.gender,
      dateOfBirth: doctorRequest.dateOfBirth,
      mobileNumber: doctorRequest.mobileNumber,
      profileImage: doctorRequest.profileImage,
      verified: true,
      role: 'doctor',
    });

    const doctor : DoctorInterface[] = await trx('doctors').returning('*').insert({
      userId: user[0].id,
      bio: doctorRequest.bio,
    });

    await trx('doctor_specializations').insert({
      doctorId: doctor[0].id,
      specializationId: doctorRequest.specializationId,
    });

    await trx('doctor_areas').insert({
      doctorId: doctor[0].id,
      areaId: doctorRequest.areaId,
    });

    await trx('doctor_insurances').insert({
      doctorId: doctor[0].id,
      insuranceId: 1,
    });

    await trx.commit();

    await workingDayService.create(doctor[0].id);

    // send email with password
    sendEmailWithPassword(user[0], password);

    return user[0];
  });
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

export const approve = async (id: number) => knex.transaction(async (trx) => {
  const request : any = await trx('doctor_requests')
    .returning('*')
    .delete()
    .where({ id });

  if (!request || !request[0]) { throw new AppError('Request with the given id is not found', status.NOT_FOUND); }

  await createDoctor(request[0]);

  return request[0];
});

const doctorRequestService = {
  create,
  get,
  reject,
  approve,
};

export default doctorRequestService;
