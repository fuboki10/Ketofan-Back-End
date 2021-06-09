/* eslint-disable no-return-assign */
import _ from 'lodash';
import knex from '../../db';
import { WorkingDayInterface, WorkingDay } from '../models';
import bookingService from './booking.service';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
interface CreateWorkingDay {
  type?: string;
  days: [
    {day?:string, from?: string, to?:string, duration?:number, slots?:number, type?: string}
  ]
}

export const create = async (doctorId: number,
  workingDayProps: CreateWorkingDay = { days: [{ }] }) : Promise<WorkingDayInterface[]> => {
  const { type } = workingDayProps;
  let objs = workingDayProps.days.map((obj) => ({
    ...obj, type, doctorId, working: true,
  }));

  weekDays.forEach((day) => {
    const found = objs.find((obj) => (obj.day === day));
    if (!found) {
      objs.push({
        day, working: false, type, doctorId,
      });
    }
  });

  objs = objs.filter((obj) => obj.day);
  const propsArr = objs.map((obj) => _.omitBy(obj, _.isNil));

  const res = await knex.transaction(async (trx) => {
    await trx('working_days')
      .where({ doctorId })
      .delete();

    const workingDays : any = await trx('working_days')
      .returning('*')
      .insert(propsArr);

    return workingDays;
  });

  await bookingService.create(res);

  return res;
};

export const get = async (doctorId: number) : Promise<WorkingDayInterface[]> => {
  const workingDays = await WorkingDay
    .find({ doctorId })
    .select('*');

  const res = workingDays.map((obj : any) => _.omitBy(obj, _.isNil));

  return res;
};

const workingDayService = {
  create,
  get,
};

export default workingDayService;
