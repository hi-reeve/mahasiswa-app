import { format } from "date-fns";

import { CalendarDate, type DateValue } from "@internationalized/date";
export const epochSecondToMilliseconds = (date: number) => date * 1000;
export const formatDate = (
	date: number,
	strFormat: string = "dd-MM-yyyy HH:mm"
) => format(epochSecondToMilliseconds(date), strFormat);

export const dateToEpochSecond = (date: Date | number) =>
	typeof date === "number"
		? Math.trunc(date / 1000)
		: Math.trunc(date.getTime() / 1000);

export const dateValueToDate = (date: DateValue) =>
	new Date(date.year, date.month - 1, date.day);

export const dateToDateValue = (date: Date | number) => {
	const dt = new Date(date);
	return new CalendarDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
};
