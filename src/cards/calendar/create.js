import { createElement } from "../../tools/utils.js";
import styles from "./styles.css";

export function createStructure(context) {
  context.elements = {};
  context.elements.calendarCardContent = createElement('div', 'bubble-calendar-content');
  
  context.elements.calendarCard = createElement('div', 'bubble-calendar');
  context.elements.calendarCard.style.setProperty('--bubble-calendar-height', `${(context.config.rows ?? 1) * 56}px`);
  context.elements.calendarCard.appendChild(context.elements.calendarCardContent);
  context.elements.calendarCard.addEventListener('scroll', () => {
    if (context.elements.calendarCard.scrollHeight > context.elements.calendarCard.offsetHeight + context.elements.calendarCard.scrollTop) {
      context.elements.calendarCardWrapper.classList.add('is-overflowing');
    } else {
      context.elements.calendarCardWrapper.classList.remove('is-overflowing');
    }
  });
  
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