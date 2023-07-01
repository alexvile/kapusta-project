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
