import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// todo - load records not by month but by calendar view
// todo - skeleton for loading calendar to prevent overlaping when loading
export const Calendar = () => {
  const handleDateClick = (arg) => {
    // only for mobile devices !!!!!!
    console.log("DataClick");
    console.log(arg);
  };
  const handleDateSelect = (selectInfo) => {
    // only for desktop devices !!!!!!!!!!!

    console.log("DataSelect");
    // prompt("Please enter a new title for your event");
    console.log(selectInfo);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    console.log(calendarApi);
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: new Date().toISOString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
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
  const handleLoading = () => {
    console.log("loading");
  };
  const eventAddHandler = (addInfo) => {
    console.log(11111, addInfo);
  };
  const handleEventsSet = (events) => {
    console.log(events);
    // this.setState({
    //   currentEvents: events,
    // });
  };
  return (
    <div className="index-route max-w-[80%]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // events
        // todo - may use function instead ???
        events={"/service/records"}
        selectable={true}
        editable={true}
        eventOverlap={false}
        // handlers
        select={handleDateSelect}
        dateClick={handleDateClick}
        // eventClick={({ event, jsEvent }) => alert(event.title)}
        // eventsSet={handleEventsSet}
        // todo - lazyFetching doesnt work on month View??????
        // to draw events
        // eventContent={console.log}
        lazyFetching={true}
        // todo - logic to loading - idle - etc
        loading={handleLoading}
        // view
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        nowIndicator={true}
        firstDay={1}
        navLinks={true}
        // event and slot time format
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        // db handlers
        eventAdd={eventAddHandler}
        // eventChange={function(){}}
        // eventRemove={function(){}}

        // when dragging draw immediately
        // selectMirror={true}
      />
    </div>
  );
};
// todo - change to ukrainian by changing loocale
// todo - add drag-n-drop
// todo - add notification if one event overlap another
