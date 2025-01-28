#!/usr/bin/env ts-node

export type CruiseDayTime = {
  dayMinutes: number;
  cruiseDay: number;
};

export const calcCruiseDayTime: (dateValue: Date, cruiseStartDate: Date, cruiseEndDate: Date) => CruiseDayTime = (
  dateValue: Date,
  cruiseStartDate: Date,
  cruiseEndDate: Date,
) => {
  // Subtract 3 hours so the 'day' divider for events is 3AM. NOT doing timezone math here.
  let adjustedDate = new Date(dateValue.getTime() - 3 * 60 * 60 * 1000);

  let cruiseStartDay = cruiseStartDate.getDay();
  // Hackish. StartDate is midnight EST, which makes getDay return the day before in [PCM]ST.
  if (cruiseStartDate.getHours() > 12) {
    cruiseStartDay = (cruiseStartDay + 1) % 7;
  }
  let cruiseDay = (7 - cruiseStartDay + adjustedDate.getDay()) % 7;
  if (adjustedDate >= cruiseStartDate && adjustedDate < cruiseEndDate) {
    cruiseDay = Math.trunc((adjustedDate.getTime() - cruiseStartDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  // To avoid confusion, the term "cruiseday" refers to "the nth day of the cruise" (1st, 2nd, 8th...).
  cruiseDay += 1;

  return {
    // .getHours() and .getMinutes() return in local time.
    dayMinutes: adjustedDate.getHours() * 60 + adjustedDate.getMinutes(),
    cruiseDay: cruiseDay,
  };
};

const minutelyUpdatingDate = new Date('2024-09-10T01:20:00.000Z');
const startDate = new Date('2024-03-09T05:00:00.000Z');
const endDate= new Date('2024-03-16T04:00:00.000Z');

const nowDayTime = calcCruiseDayTime(minutelyUpdatingDate, startDate, endDate);

console.log(nowDayTime, startDate, endDate);
