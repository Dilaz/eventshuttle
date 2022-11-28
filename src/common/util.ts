/**
 * Returns a date in ISO 8601 date format, ie. 2022-11-26
 * @param date Date
 * @returns string
 */
export function formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}
