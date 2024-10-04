import { format } from 'date-fns';

export function formatTimestamp(timestamp) {
    if (!timestamp) return 'No date';
    const date = new Date(timestamp);
    return format(date, 'PPpp');
}
