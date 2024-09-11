import moment from 'moment';

export const validEvent = (newEvent, existingEvent) => {
  const { dateFrom, dateTo } = newEvent;

  const selectedStart = moment(dateFrom); // Дата и время начала события
  const selectedEnd = moment(dateTo);     // Дата и время конца события
  const now = moment();                   // Текущая дата и время

  // Проверка, что событие не начинается в прошлом
  if (selectedStart.isBefore(now, 'minute')) {
    alert('The event cannot start in the past');
    return false;
  }

  // Проверка, что событие начинается и заканчивается в один и тот же день
  if (!selectedStart.isSame(selectedEnd, 'day')) {
    alert('The event must start and end within the same day');
    return false;
  }

  // Проверка: время окончания должно быть позже времени начала
  if (selectedEnd.isSameOrBefore(selectedStart)) {
    alert('End time must be later than start time.');
    return false;
  }

  // Проверка: время начала должно быть кратно 15 минутам
  if (selectedStart.minutes() % 15 !== 0) {
    alert('Start time must be in multiples of 15 minutes');
    return false;
  }

  // Проверка: продолжительность события должна быть кратна 15 минутам
  if (selectedEnd.diff(selectedStart, 'minutes') % 15 !== 0) {
    alert('Event duration must be in multiples of 15 minutes');
    return false;
  }

  const eventList = Array.isArray(existingEvent) ? existingEvent : [];

  // Проверка пересечения с существующими событиями
  const hasIntersection = eventList.some(event => {
    const eventStart = moment(event.dateFrom);
    const eventEnd = moment(event.dateTo);
    return selectedStart.isBefore(eventEnd) && selectedEnd.isAfter(eventStart);
  });

  if (hasIntersection) {
    alert('Events are interrupted in time');
    return false;
  }

  // Проверка продолжительности события
  if (selectedEnd.diff(selectedStart, 'hour') > 6) {
    alert('The event cannot be longer than 6 hours');
    return false;
  }

  return true;
};

export const canDeleteEvent = time => {
  const currentTime = moment();

  const [startTimeStr, endTimeStr] = time.split(' - ');

  const eventStartTime = moment(
    `${currentTime.format('YYYY-MM-DD')} ${startTimeStr}`,
    'YYYY-MM-DD HH:mm',
  );

  const eventEndTime = moment(
    `${currentTime.format('YYYY-MM-DD')} ${endTimeStr}`,
    'YYYY-MM-DD HH:mm',
  );

  const differenceInMinutes = eventStartTime.diff(currentTime, 'minutes');

  if (differenceInMinutes < 15 && differenceInMinutes >= 0) {
    alert('You cannot delete an event less than 15 minutes before it starts');
    return false;
  }

  //Проверка, что текущее время больше времени начала и меньше времени окончания
  if (currentTime.isBetween(eventStartTime, eventEndTime)) {
    alert("You can't delete the event while it's in progress");
    return false;
  }

  return true;
};
