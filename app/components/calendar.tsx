import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// todo - load records not by month but by calendar view
// todo - skeleton for loading calendar to prevent overlaping when loading
export const Calendar11 = () => {
  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
    console.log(arg);
  };
  const handleDateSelect = () => {
    prompt("Please enter a new title for your event");
    // let title = prompt('Please enter a new title for your event');
    // let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };
  const mockEvents = [
    {
      title: "event 10-11",
      start: "2023-09-10T10:32:00.000Z",
      end: "2023-09-11T13:00:00.000Z",
    },
    {
      title: "Long evt",
      start: "2023-09-20",
      end: "2023-09-23",
      // allDay: false,
    },
    { title: "event 28", date: "2023-09-23" },
    {
      title: "event 28 (by)",
      start: "2023-09-28T14:32:00.000Z",
      // end: "2023-09-28T19:00:00.000Z",
    },
    {
      title: "event 30",
      start: "2023-09-30T10:30:00.000Z",
      end: "2023-09-30T14:00:00.000Z",
    },
    {
      title: "event 30",
      start: "2023-09-30T14:15:00.000Z",
      end: "2023-09-30T16:00:00.000Z",
    },
  ];
  return (
    <div className="index-route max-w-[80%]">
      <FullCalendar
        selectable={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        select={handleDateSelect}
        // dateClick={handleDateClick}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        firstDay={1}
        events={mockEvents}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        nowIndicator={true}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />
    </div>
  );
};
// todo - change to ukrainian by changing loocale
// todo - add drag-n-drop
// todo - add notification if one event overlap another
