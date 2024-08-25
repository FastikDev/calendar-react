import moment from "moment";

export const validEvent = (newEvent, existingEvent) => {
  const { dateFrom, dateTo } = newEvent;

  // Проверка на текущий день
  const selectedDate = moment(dateFrom).startOf("day");
  const today = moment().startOf("day");

  if (!selectedDate.isSame(today)) {
    alert("The event must start and end within one day");
    return false;
  }

  const start = moment(dateFrom);
  const end = moment(dateTo);

  console.log("Start date:", start.format());
  console.log("End date:", end.format());

  const eventList = Array.isArray(existingEvent) ? existingEvent : [];

  // Проверка пересечения с существующими событиями
  const hasIntersection = eventList.some((event) => {
    const eventStart = moment(event.dateFrom);
    const eventEnd = moment(event.dateTo);
    return start.isBefore(eventEnd) && end.isAfter(eventStart);
  });

  if (hasIntersection) {
    alert("Events are interrupted in time");
    return false;
  }

  // Проверка продолжительности события
  if (end.diff(start, "hour") > 6) {
    alert("The event cannot be longer than 6 hours");
    return false;
  }

  return true;
};
