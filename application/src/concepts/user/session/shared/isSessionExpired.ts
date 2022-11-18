import { isAfter } from 'date-fns';

export const isSessionExpired = (date: Date): boolean => isAfter(date, new Date());
