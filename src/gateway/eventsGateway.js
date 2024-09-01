const baseUrl = `https://66d4685a5b34bcb9ab3e8536.mockapi.io/events`;

export const fetchEvent = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }

    return response.json().then((events) =>
      events.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }))
    );
  });
};

export const createEvent = (eventDate) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(eventDate),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};

export const deleteEvent = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
