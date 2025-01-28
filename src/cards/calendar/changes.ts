import setupTranslation from "../../tools/localize.ts";
import { applyScrollingEffect } from "../../tools/utils.ts";
import { hashCode, intToRGB } from "./helpers.ts";

export async function changeEventList(context) {
  const daysOfEvents = context.config.days ?? 7;

  const start = new Date().toISOString();
  const end = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * daysOfEvents).toISOString();
  const params = `start=${start}&end=${end}`;

  const promises = context.config.entities.map(async (entity) => {
    const url = `calendars/${entity.entity}?${params}`;
    const events = await context._hass.callApi("get", url);

    return events.map(e => ({...e, entity}));
  });

  const events = await Promise.all(promises);
  
  context.events = events.flat()
    .sort(
      (a, b) => new Date(a.start.date ?? a.start.dateTime).getTime() - new Date(b.start.date ?? b.start.dateTime).getTime()
    )
    .slice(0, context.config.limit ?? undefined);
}

export async function changeEvents(context) {
  const t = setupTranslation(context._hass);
  const eventsGroupedByDay = context.events.reduce((acc, event) => {
    const day = event.start.date ?? event.start.dateTime.split('T')[0];
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(event);
    return acc;
  }, {});

  context.elements.calendarCardContent.innerHTML = '';

  Object.keys(eventsGroupedByDay).sort().forEach((day) => {
    const dayNumber = document.createElement('div');
    dayNumber.classList.add('bubble-day-number');
    dayNumber.innerHTML = `${new Date(day).getDate()}`;

    const dayMonth = document.createElement('div');
    dayMonth.classList.add('bubble-day-month');
    dayMonth.innerHTML = new Date(day).toLocaleString('default', { month: 'short' });

    const dayChip = document.createElement('div');
    dayChip.classList.add('bubble-day-chip');
    dayChip.appendChild(dayNumber);
    dayChip.appendChild(dayMonth);

    const dayEvents = document.createElement('div');
    dayEvents.classList.add('bubble-day-events');

    eventsGroupedByDay[day].forEach((event) => {
      const eventTime = document.createElement('div');
      eventTime.classList.add('bubble-event-time');
      eventTime.innerHTML = event.start.date ? t("cards.calendar.all_day") : new Date(event.start.dateTime).toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });

      const eventName = document.createElement('div');
      eventName.classList.add('bubble-event-name');
      eventName.innerHTML = event.summary || t("cards.calendar.busy");

      const eventColor = document.createElement('div');
      eventColor.classList.add('bubble-event-color');
      eventColor.style.backgroundColor = event.entity.color || intToRGB(hashCode(event.entity.entity));

      const eventLine = document.createElement('div');
      eventLine.classList.add('bubble-event');
      eventLine.appendChild(eventTime);
      eventLine.appendChild(eventColor);
      eventLine.appendChild(eventName);

      const now = new Date();
      if (new Date(event.start.dateTime ?? event.start.date) < now) {
        eventLine.style.setProperty('--bubble-event-background-color', 'var(--bubble-event-accent-color, var(--bubble-accent-color, var(--accent-color)))');
      }
      
      dayEvents.appendChild(eventLine);
    });

    const dayWrapper = document.createElement('div');
    dayWrapper.classList.add('bubble-day-wrapper');
    dayWrapper.appendChild(dayChip);
    dayWrapper.appendChild(dayEvents);

    context.elements.calendarCardContent.appendChild(dayWrapper);
    context.elements.calendarCard.addEventListener('scroll', () => {
      if (context.elements.calendarCard.scrollHeight > context.elements.calendarCard.offsetHeight + context.elements.calendarCard.scrollTop) {
        context.elements.calendarCardWrapper.classList.add('is-overflowing');
      } else {
        context.elements.calendarCardWrapper.classList.remove('is-overflowing');
      }
    });

    if (context.elements.calendarCard.scrollHeight > context.elements.calendarCard.offsetHeight) {
      context.elements.calendarCardWrapper.classList.add('is-overflowing');
    }
  });

}