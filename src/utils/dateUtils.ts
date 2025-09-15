import moment from 'moment';

export const addDays = (date: Date, days: number): Date => {
  return moment(date).add(days, 'days').toDate();
};

export const addWeeks = (date: Date, weeks: number): Date => {
  return moment(date).add(weeks, 'weeks').toDate();
};

export const startOfMonth = (date: Date): Date => {
  return moment(date).startOf('month').toDate();
};

export const endOfMonth = (date: Date): Date => {
  return moment(date).endOf('month').toDate();
};

export const startOfWeek = (date: Date): Date => {
  return moment(date).startOf('week').toDate();
};

export const endOfWeek = (date: Date): Date => {
  return moment(date).endOf('week').toDate();
};

export const eachDayOfInterval = (interval: { start: Date; end: Date }): Date[] => {
  const days: Date[] = [];
  const current = moment(interval.start);
  const end = moment(interval.end);
  
  while (current.isSameOrBefore(end)) {
    days.push(current.toDate());
    current.add(1, 'day');
  }
  
  return days;
};

export const format = (date: Date, formatStr: string): string => {
  const momentDate = moment(date);
  
  switch (formatStr) {
    case 'MMMM yyyy':
      return momentDate.format('MMMM YYYY');
    case 'd':
      return momentDate.format('D');
    case 'yyyy-MM-dd':
      return momentDate.format('YYYY-MM-DD');
    default:
      return momentDate.format('L');
  }
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return moment(date1).isSame(moment(date2), 'day');
};

export const isToday = (date: Date): boolean => {
  return moment(date).isSame(moment(), 'day');
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return moment(date1).isSame(moment(date2), 'month');
};

export const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDayOfMonth = moment().year(year).month(month).startOf('month');
  const lastDayOfMonth = moment().year(year).month(month).endOf('month');
  const startDate = firstDayOfMonth.clone().startOf('week');
  const endDate = lastDayOfMonth.clone().endOf('week');
  
  return eachDayOfInterval({ start: startDate.toDate(), end: endDate.toDate() });
};