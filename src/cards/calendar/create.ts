import { createElement } from "../../tools/utils.ts";
import styles from "./styles.ts";

export function createStructure(context) {
  context.elements = {};
  context.elements.calendarCardContent = createElement('div', 'bubble-calendar-content');
  
  context.elements.calendarCard = createElement('div', 'bubble-calendar');
  context.elements.calendarCard.style.setProperty('--bubble-calendar-height', `${(context.config.rows ?? 1) * 56}px`);
  context.elements.calendarCard.appendChild(context.elements.calendarCardContent);
  
  context.elements.style = createElement('style');
  context.elements.style.innerText = styles;
  context.elements.customStyle = createElement('style');
  
  context.elements.calendarCardWrapper = createElement('div', 'bubble-calendar-wrapper');
  context.elements.calendarCardWrapper.appendChild(context.elements.calendarCard);

  context.content.innerHTML = '';
  context.content.appendChild(context.elements.calendarCardWrapper);
  context.content.appendChild(context.elements.style);
  context.content.appendChild(context.elements.customStyle);

  context.cardType = "calendar";
}