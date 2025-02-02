import setupTranslation from "../../tools/localize.js";
import { addActions } from "../../tools/tap-actions.js";
import { hashCode, intToRGB } from "./helpers.js";

function dateDiffInMinutes(a, b) {
  const MS_PER_MINUTES = 1000 * 60;

  return Math.floor((b - a) / MS_PER_MINUTES);
}

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
    const eventDay = new Date(day);
    const today = new Date();
    const dayNumber = document.createElement('div');
    dayNumber.classList.add('bubble-day-number');
    dayNumber.innerHTML = `${eventDay.getDate()}`;

    const dayMonth = document.createElement('div');
    dayMonth.classList.add('bubble-day-month');
    dayMonth.innerHTML = eventDay.toLocaleString('default', { month: 'short' });

    const dayChip = document.createElement('div');
    dayChip.classList.add('bubble-day-chip');
    dayChip.appendChild(dayNumber);
    dayChip.appendChild(dayMonth);
    if (eventDay.getDate() === today.getDate() && eventDay.getMonth() === today.getMonth()) {
      dayChip.classList.add('is-active');
    }

    const dayEvents = document.createElement('div');
    dayEvents.classList.add('bubble-day-events');

    eventsGroupedByDay[day].forEach((event) => {
      const eventTime = document.createElement('div');
      eventTime.classList.add('bubble-event-time');
      eventTime.innerHTML = event.start.date ? t("cards.calendar.all_day") : new Date(event.start.dateTime).toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });
      if (!event.start.date && context.config.show_end === true) {
        eventTime.innerHTML += ` – ${new Date(event.end.dateTime).toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' })}`;
      }

      const eventName = document.createElement('div');
      eventName.classList.add('bubble-event-name');
      eventName.innerHTML = event.summary || t("cards.calendar.busy");

      const eventColor = document.createElement('div');
      eventColor.classList.add('bubble-event-color');
      eventColor.style.backgroundColor = event.entity.color
        ? `var(--${event.entity.color}-color)`
        : intToRGB(hashCode(event.entity.entity));

      const eventLine = document.createElement('div');
      eventLine.classList.add('bubble-event');
      eventLine.appendChild(eventColor);
      eventLine.appendChild(eventTime);
      eventLine.appendChild(eventName);
      addActions(eventLine, { ...context.config, entity: event.entity.entity });

      const now = new Date();
      const start = new Date(event.start.dateTime ?? event.start.date);
      const end = new Date(event.end.dateTime ?? event.end.date);
      const activeColor = 'var(--bubble-event-accent-color, var(--bubble-accent-color, var(--accent-color)))';

      if (context.config.show_progress === true && event.start.date && start < now) {
        eventLine.style.setProperty('--bubble-event-background-color', activeColor);
      } else if (context.config.show_progress === true &&event.start.dateTime && start < now) {
        const durationDiff = dateDiffInMinutes(start, end);
        const startDiff = dateDiffInMinutes(start, now);
        const percentage = 100 * startDiff / durationDiff;

        eventLine.style.setProperty('--bubble-event-background-image', `linear-gradient(to right, ${activeColor} ${percentage}%, transparent ${percentage}%)`);
      }
      
      dayEvents.appendChild(eventLine);
    });

    const dayWrapper = document.createElement('div');
    dayWrapper.classList.add('bubble-day-wrapper');
    dayWrapper.appendChild(dayChip);
    dayWrapper.appendChild(dayEvents);

    context.elements.calendarCardContent.appendChild(dayWrapper);

    if (context.elements.calendarCard.scrollHeight > context.elements.calendarCard.offsetHeight) {
      context.elements.calendarCardWrapper.classList.add('is-overflowing');
    }
  });

}