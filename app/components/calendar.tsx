import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { localWithTZtoIsoString } from "~/helpers/timeConvertor";

// todo - load records not by month but by calendar view
// todo - skeleton for loading calendar to prevent overlaping when loading
// todo - touch and longPressDelay
export const Calendar = () => {
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoading =
      fetcher.state === "loading" || fetcher.state === "submitting";
    const isDone = fetcher.state === "idle" && fetcher.data != null;

    if (isLoading) {
      console.log("loading...");
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (isDone) {
      console.log("change successfull", fetcher.data);
      // alert("updated successfull");
      // remix toast - successfull operation
    }
  }, [fetcher]);

  const handleDateClick = (arg) => {
    // only for mobile devices !!!!!!
    console.log("DataClick");
    console.log(arg);
    // prompt("Please enter a new title for your event");

    let title = prompt("Please enter a new title for your event");
    let calendarApi = arg.view.calendar;
    console.log(calendarApi);
    // calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: new Date().toISOString(),
        title,
        start: arg.dateStr,
        allDay: arg.allDay,
      });
    }
  };

  const eventChangeHandler = async (e) => {
    const { oldEvent, event, revert } = e;
    // todo - add feature update only date by drag'n'drop or update other info by click or open modal etc
    // try {
    //   // todo - in this case we will throw backend logic to frontend
    //   // await simpleUpdateRecordByCP(...);
    // } catch (error) {
    //   console.log(error);
    //   // revert();
    // }
    const newStart = localWithTZtoIsoString(event.startStr);
    const newEnd = localWithTZtoIsoString(event.endStr);

    const formData = new FormData();
    formData.append("id", oldEvent.id);
    formData.append("start", newStart);
    formData.append("end", newEnd);
    fetcher.submit(formData, {
      method: "PATCH",
      action: "service/calendar-records",
    });
  };

  const handleDateSelect = (selectInfo) => {
    // only for desktop devices !!!!!!!!!!!

    console.log("DataSelect");
    // prompt("Please enter a new title for your event");
    // console.log(selectInfo);
    // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;
    // console.log(calendarApi);
    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: new Date().toISOString(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleLoading = () => {
    console.log("loading calendar");
  };
  const eventAddHandler = (addInfo) => {
    console.log("Event added to calendar API", addInfo);
  };
  const handleEventsSet = (events) => {
    console.log(events);
    // this.setState({
    //   currentEvents: events,
    // });
  };
  // todo  - prevent click on month view !!!!
  return (
    <div className="index-route max-w-[80%]">
      {loading && <div className="absolute">loading...</div>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // events
        // todo - may use function instead ???
        events={"/service/records"}
        // selectable={true}
        editable={loading ? false : true}
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
        eventChange={eventChangeHandler}
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
