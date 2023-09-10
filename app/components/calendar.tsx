import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

// todo - load records not by month but by calendar view
export const Calendar11 = () => {
  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
    console.log(arg);
  };
  return (
    <div className="index-route max-w-[80%]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        events={[
          {
            title: "event 1",
            start: "2023-09-10T11:32:00.000Z",
            end: "2023-09-10T13:00:00.000Z",
          },
          {
            title: "Long evt",
            start: "2023-09-20",
            end: "2023-09-23",
            // allDay: false,
          },
          { title: "event 2", date: "2023-09-23" },
        ]}
      />
    </div>
  );
};
