/* eslint-disable no-return-assign */
import knex from '../../db';
import { WorkingDayInterface } from '../models';

interface CreateWorkingDay {
  type: string;
  days: [
    {day:string, from: string, to:string, duration:number, slots:number, type?: string}
  ]
}

export const create = async (doctorId: number, workingDayProps: CreateWorkingDay) :
Promise<WorkingDayInterface[]> => {
  const { type } = workingDayProps;
  const objs = workingDayProps.days.map((obj) => ({ ...obj, type, doctorId }));

  return knex.transaction(async (trx) => {
    await trx('Working_days')
      .returning('*')
      .where({ doctorId })
      .delete();

    const workingDay : any = await trx('Working_days')
      .returning('*')
      .where({ doctorId })
      .insert(objs);

    return workingDay;
  });
};

const workingDayService = {
  create,
};

export default workingDayService;
