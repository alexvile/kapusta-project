import { useEffect, useState } from "react";
import { convertMsToTime } from "~/helpers/calculations";
interface ICustomDurationPicker {
  hours: number[];
  minuts: number[];
  name: string;
  label?: string;
  zeroOption?: boolean;
  emptyValue?: boolean;
  allowZeroDuration?: boolean;
  durationInMs?: boolean;
  initialValue?: number;
}
export function CustomDurationPicker({
  hours,
  minuts,
  name,
  label,
  durationInMs = false,
  zeroOption = true,
  emptyValue = true,
  allowZeroDuration = false,
  initialValue,
}: ICustomDurationPicker) {
  const [duration, setDuration] = useState<number | string>();
  //   temp state
  const [minutsS, setMinutsS] = useState<string>();
  const [hoursS, setHoursS] = useState<string>();

  const calculateDurationInMs = (h: string, m: string) => {
    const hoursInMs = Number(h) * 60 * 60 * 1000;
    const minutsInMs = Number(m) * 60 * 1000;
    return hoursInMs + minutsInMs;
  };

  const convertMsToDuration = (
    milliseconds: number
  ): { hours: number; minutes: number } => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return { hours, minutes };
  };

  useEffect(() => {
    // todo - check if string(no ms logic) or number(ms logic)
    if (typeof initialValue === "number") {
      const { hours, minutes } = convertMsToDuration(initialValue);
      setHoursS(hours.toString());
      setMinutsS(minutes.toString());
    }
  }, []);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  useEffect(() => {
    if (!minutsS || !hoursS) {
      console.log("not selected");
      // todo - handler !!!
      return;
    }

    if (minutsS === "0" && hoursS === "0") {
      console.log("total duration 0");
      if (allowZeroDuration) {
        setDuration(0);
      }
      return;
      // todo - handler !!!
    }
    // if everything ok
    durationInMs
      ? setDuration(calculateDurationInMs(hoursS, minutsS))
      : setDuration(`${hoursS}h-${minutsS}m`);
  }, [minutsS, hoursS]);

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.id) {
      case "durationPicker-hours":
        setHoursS(e.target.value);
        break;
      case "durationPicker-minuts":
        setMinutsS(e.target.value);
        break;
      default:
        return;
    }
  };
  return (
    <div>
      {label && <label htmlFor="durationPicker-duration">{label}</label>}
      <input
        type="hidden"
        defaultValue={duration}
        id="durationPicker-duration"
        name={name}
      />
      <select
        id="durationPicker-hours"
        onChange={(e) => selectChange(e)}
        value={hoursS}
      >
        {emptyValue && <option value="">--</option>}
        {zeroOption && <option value="0">0</option>}
        {hours.length > 0 &&
          hours.map((e) => (
            <option key={String(e)} value={String(e)}>
              {String(e)}
            </option>
          ))}
      </select>
      <label htmlFor="durationPicker-hour">hour</label>
      <select
        id="durationPicker-minuts"
        onChange={(e) => selectChange(e)}
        value={minutsS}
      >
        {emptyValue && <option value="">--</option>}
        {zeroOption && <option value="0">00</option>}
        {minuts.length > 0 &&
          minuts.map((e) => (
            <option key={String(e)} value={String(e)}>
              {String(e)}
            </option>
          ))}
      </select>
      <label htmlFor="durationPicker-minuts">minuts</label>
    </div>
  );
}
