import { DateInput } from "../date-input";

export const DateRange = ({ initial }: any) => {
  return (
    <div className="flex gap-2">
      <DateInput
        name="from"
        type="date"
        label="From:"
        defaultValue={initial?.from}
        // onChange={(e) => {
        //   setTimeFrom(e.currentTarget.value);
        // }}
        // value={timeFrom}
      />
      <DateInput
        name="to"
        type="date"
        label="To:"
        defaultValue={initial?.to}

        // onChange={(e) => {
        //   setTimeTo(e.currentTarget.value);
        // }}
        // value={timeTo}
      />
    </div>
  );
};
