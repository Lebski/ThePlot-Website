import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// ----------------------------------------------------------------------

// Learn more: https://date-fns.org/v2.25.0/docs/format

// dd MM yyyy = 02 10 2021
// dd MMM yyyy = 02 Jan 2021
// dd MMMM yyyy p = 02 February 2021 3:57 PM
// dd MMMM yyyy hh:mm = 02 February 2021  03:58
// dd MMMM yyyy hh:mm:ss = 02 February 2021 03:59:01

export function fDate(date, option) {
  return format(new Date(date), option || 'dd MMM yyyy');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fToNow(date, { addSuffix = true, includeSeconds = false }) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: addSuffix,
    includeSeconds: includeSeconds,
  });
}
