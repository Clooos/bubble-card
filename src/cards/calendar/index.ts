import { changeSubButtonState } from '../../tools/global-changes.ts';
import { changeEventList, changeEvents } from './changes.ts'
import { createStructure } from './create.ts';

export function handleCalendar(context, container = context.content) {
  if (context.cardType !== `calendar`) {
    createStructure(context);
  }

  const cacheKey = JSON.stringify(context.config.entities.map(e => context._hass.states[e.entity])); 

  if (context.cacheKey !== cacheKey) {
    context.cacheKey = cacheKey;

    // Force refresh every 15 minutes
    setTimeout(() => {
      context.cacheKey = '';
    }, 1000 * 60 * 15);

    changeEventList(context).then(() => {
      changeEvents(context);
    });
  }

  changeSubButtonState(context, container, context.elements.calendarCard);
}