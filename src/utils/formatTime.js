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
    addSuffix: true,
  });
}

export function fShopify(date) {
  return (new Date(date)).toLocaleString({ dateStyle: "short", timeStyle: "short" });
}
