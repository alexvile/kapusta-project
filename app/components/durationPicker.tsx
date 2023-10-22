import { useEffect, useState } from "react";
interface ICustomDurationPicker {
  hours: Number[];
  minuts: Number[];
  zeroOption?: Boolean;
  emptyValue?: Boolean;
  allowZeroDuration?: Boolean;
}
export function CustomDurationPicker({
  hours,
  minuts,
  zeroOption = true,
  emptyValue = true,
  allowZeroDuration = false,
}: ICustomDurationPicker) {
  // todo - initial value
  const [duration, setDuration] = useState<number>();
  //   temp state
  const [minutsS, setMinutsS] = useState("");
  const [hoursS, setHoursS] = useState("");

  const calculateDurationInMs = (h: string, m: string) => {
    const hoursInMs = Number(h) * 60 * 60 * 1000;
    const minutsInMs = Number(m) * 60 * 1000;
    return hoursInMs + minutsInMs;
  };

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
    setDuration(calculateDurationInMs(hoursS, minutsS));
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
      hidden
      <input type="text" defaultValue={duration} />
      <div>
        visual
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
    </div>
  );
}
