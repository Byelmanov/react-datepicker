import { PrevNextMonth, WeekDays } from 'models/DatePicker';

export const THIS_YEAR: number = +new Date().getFullYear();
export const THIS_MONTH: number = +new Date().getMonth() + 1;

export const WEEK_DAYS: WeekDays = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

export const CALENDAR_WEEKS = 6;

export const zeroPad = (value: string | number, length = 2): string => {
  return `${value}`.padStart(length, '0');
};

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR): number => {
  const month30: number[] = [4, 6, 9, 11];
  const leapYear: boolean = year % 4 === 0;

  return month === 2 ? (leapYear ? 29 : 28) : month30.includes(month) ? 30 : 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR): number => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

export const isDate = (date: Date | null): boolean => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return <boolean>isDate && <boolean>isValidDate;
};

export const getDateISO = (date = new Date()): string | null => {
  if (!isDate(date)) return null;

  return [date.getFullYear(), zeroPad(+date.getMonth() + 1, 2), zeroPad(+date.getDate(), 2)].join(
    '-'
  );
};

export const getPreviousMonth = (month: number, year: number): PrevNextMonth => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number): PrevNextMonth => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

export const isSameMonth = (date: any, basedate = new Date()): any => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

export const isSameDay = (date: any, basedate = new Date()): any => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    +basedateDate === +dateDate && +basedateMonth === +dateMonth && +basedateYear === +dateYear
  );
};
