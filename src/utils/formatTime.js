import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'MMMM dd yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'MMM dd yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'MM/dd/yyyy hh:mm');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fShopify(date) {
  var newDateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return new Date(date).toLocaleString('en-US', newDateOptions);
}

export function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}
