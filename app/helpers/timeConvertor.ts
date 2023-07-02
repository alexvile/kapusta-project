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
// console.log(localDateFromToIsoString("2023-06-27"));
// console.log(localDateToToIsoString("2023-06-27"));

export function getISOFromAndToForToday() {
  const todayUTC = new Date();
  // console.log(todayUTC);
  // console.log(todayUTC.toLocaleString());
  const todayLocal = todayUTC.toLocaleDateString("en-ZA").replaceAll("/", "-");
  const todayFrom = localDateFromToIsoString(todayLocal);
  const todayTo = localDateToToIsoString(todayLocal);
  return { todayFrom, todayTo };
}

// todo - using intl instead time date
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// getISOFromAndToForToday();
// console.log(todayUTC);
