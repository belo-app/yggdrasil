import dayjs from "dayjs";

export const getBinDateRanges = (
  startDate: string,
  endDate: string,
  rangeLengthInDays: string
): [string, string][] => {
  const range = Number(rangeLengthInDays);
  const isEndDateBeforeRangeEnd =
    dayjs(endDate).diff(startDate, "day") <= range;
  const result: [string, string][] = [];

  if (isEndDateBeforeRangeEnd) {
    return [[startDate, endDate]];
  }

  let totalDuration = dayjs(endDate).diff(startDate, "day");
  let start = startDate;
  let to = startDate;

  while (totalDuration > 0 && dayjs(to).isBefore(endDate)) {
    const from = start;

    to = dayjs(start).add(range, "day").format("YYYY-MM-DD");

    result.push([from, dayjs(to).isAfter(endDate) ? endDate : to]);

    start = dayjs(to).add(1, "day").format("YYYY-MM-DD");

    totalDuration = totalDuration - range;
  }

  return result;
};
