// for input in edit Form
export function convertFromUTCToLocalISO(timeInUTC: string) {
  const localTime = new Date(timeInUTC);
  const oo = (n: number) => n.toString(10).padStart(2, "0");
  const YYYY = localTime.getFullYear();
  const MM = oo(localTime.getMonth() + 1);
  const DD = oo(localTime.getDate());
  const HH = oo(localTime.getHours());
  const II = oo(localTime.getMinutes());
  const localTimeForInput = [YYYY, MM, DD].join("-") + "T" + [HH, II].join(":");
  return localTimeForInput;
}
//  for displaying in sheets
export function formatIsoUTCStringToLocal(isoUTCString: string) {
  const dateObject = new Date(isoUTCString);
  const localTime = dateObject.toLocaleString();
  return localTime;
}
//  for displaying in sheets
export function formatIsoUTCStringToLocalWithoutSeconds(isoUTCString: string) {
  const dateObject = new Date(isoUTCString);
  const localTime = dateObject.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return localTime;
}
// for search and filter

export function localDateFromToIsoString(localDateFrom: string) {
  const localDateWithTime = localDateFrom + "T00:00:00";
  const dateObject = new Date(localDateWithTime);
  const UTCIsoString = dateObject.toISOString();
  return UTCIsoString;
}

export function localDateToToIsoString(localDateTo: string) {
  const localDateWithTime = localDateTo + "T23:59:59";
  const dateObject = new Date(localDateWithTime);
  const UTCIsoString = dateObject.toISOString();
  return UTCIsoString;
}

export function getISOFromAndToForToday() {
  const todayUTC = new Date();
  // console.log(todayUTC);
  // console.log(todayUTC.toLocaleString());
  const todayLocal = todayUTC.toLocaleDateString("en-ZA").replaceAll("/", "-");
  const todayFrom = localDateFromToIsoString(todayLocal);
  const todayTo = localDateToToIsoString(todayLocal);
  return { todayFrom, todayTo };
}

// for current date view
export function getLocalDate() {
  const todayUTC = new Date();
  const todayLocal = todayUTC.toLocaleDateString();
  // console.log(todayLocal);
  return todayLocal;
}

export function getCurrentIsoYearAndMonth() {
  const date = new Date();
  const oo = (n: number) => n.toString(10).padStart(2, "0");
  const YYYY = date.getFullYear();
  const MM = oo(date.getMonth() + 1);
  const formattedDate = [YYYY, MM].join("-");
  return formattedDate;
}
// todo - decied if we need to go for current date every re-render
// todo - using intl instead time date

//
// function getDaysInMonth(month: number, year: number) {
//   console.log(new Date(year, month, 0).getDate());
//   return new Date(year, month, 0).getDate();
// }
// getDaysInMonth(6, 2023);
// function getLastDateOfMonth(month: number, year: number) {
//   const date = new Date(year, month + 1, 0);
//   console.log(date);
//   console.log(date.toLocaleString());
//   console.log(date.toString());
//   // return date;
// }

// function get

export function getSixMonthsPeriod() {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const fullYear = date.getFullYear();
  const month = date.getMonth();
  const correctedStartIsoDay = new Date(fullYear, month, 1);
  const datePeriod = {
    start: correctedStartIsoDay.toISOString(),
    end: new Date().toISOString(),
  };
  // console.log(datePeriod);
  return datePeriod;
}

export function getFullMonthStartEndDays(yearAndMonth: string) {
  const date = new Date(yearAndMonth);
  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).toISOString();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).toISOString();
  return { firstDay, lastDay };
}

// todo - we should call this function  not very often !!!!

// -----------------------------------
// how to group date array by month in javascript
// https://blog.51cto.com/u_15064626/4653979
