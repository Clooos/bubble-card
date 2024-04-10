import { addActions, addFeedback } from "../../tools/tap-actions.ts";
import { createElement, toggleEntity } from "../../tools/utils.ts";
import { getButtonType, onSliderChange } from "./helpers.ts";
import styles from "./styles.ts";

export function createStructure(context, container = context.content, appendTo = container) {
  const buttonType = getButtonType(context);

  context.dragging = false;

  if (!context.elements) context.elements = {};

  //if (context.elements.buttonCardContainer) return;

  context.elements.buttonCardContainer = createElement('div', 'bubble-button-card-container button-container');
  context.elements.buttonCard = createElement('div', 'bubble-button-card switch-button');
  context.elements.buttonBackground = createElement('div', 'bubble-button-background');
  context.elements.nameContainer = createElement('div', 'bubble-name-container name-container');
  context.elements.iconContainer = createElement('div', 'bubble-icon-container icon-container');
  context.elements.name = createElement('div', 'bubble-name name');
  context.elements.state = createElement('div', 'bubble-state state');
  context.elements.feedback = createElement('div', 'bubble-feedback-element feedback-element');
  context.elements.icon = createElement('ha-icon', 'bubble-icon icon');
  context.elements.image = createElement('div', 'bubble-entity-picture entity-picture');
  context.elements.style = createElement('style');
  context.elements.customStyle = createElement('style');

  context.elements.feedback.style.display = 'none';
  context.elements.style.innerText = styles;

  context.elements.iconContainer.appendChild(context.elements.icon);
  context.elements.iconContainer.appendChild(context.elements.image)

  context.elements.nameContainer.appendChild(context.elements.name);
  if (buttonType !== "name") {
      context.elements.nameContainer.appendChild(context.elements.state);    
  }

  context.elements.buttonCard.appendChild(context.elements.buttonBackground);
  context.elements.buttonCard.appendChild(context.elements.iconContainer);
  context.elements.buttonCard.appendChild(context.elements.nameContainer);
  context.elements.buttonCard.appendChild(context.elements.feedback);
  context.elements.buttonCardContainer.appendChild(context.elements.buttonCard);

  container.innerHTML = '';

  if (appendTo === container) {
      container.appendChild(context.elements.buttonCardContainer);
  }

  container.appendChild(context.elements.style);
  container.appendChild(context.elements.customStyle);

  if (appendTo !== container) {
      appendTo.innerHTML = '';
      context.elements.buttonCardContainer.appendChild(container);
      appendTo.appendChild(context.elements.buttonCardContainer);
      context.buttonType = buttonType;
  } else {
      context.cardType = `button-${buttonType}`;
  }
}
export function createSwitchStructure(context) {
  addActions(context.elements.iconContainer, context.config);
  addFeedback(context.elements.buttonCard, context.elements.feedback);
  context.elements.buttonCard.addEventListener('click', (event) => {
    if (event.target.closest('.bubble-sub-button-container')) return;

    if (
        event.target.closest('.bubble-icon-container') === null ||
        event.target.closest('.bubble-sub-button-container') === null
    ){
        event.stopPropagation();
        toggleEntity(context._hass, context.config.entity);
    }
  })
}
export function createNameStructure(context) {
  if (context.config.tap_action) {
      addActions(context.elements.buttonCardContainer, context.config);
      addFeedback(context.elements.buttonCard, context.elements.feedback);
  }
}
export function createStateStructure(context) {
  addActions(context.elements.buttonCardContainer, context.config);
  addFeedback(context.elements.buttonCard, context.elements.feedback);
}
export function createSliderStructure(context) {
  addActions(context.elements.iconContainer, context.config);

  let initialX = 0;

  context.elements.rangeFill = createElement('div', 'bubble-range-fill range-fill');
  context.elements.rangeSlider = createElement('div', 'bubble-range-slider range-slider');
  context.elements.rangeSlider.appendChild(context.elements.rangeFill);
  context.elements.buttonCardContainer.appendChild(context.elements.rangeSlider);

  context.elements.buttonCardContainer.addEventListener('pointercancel', onPointerCancel);
  context.elements.buttonCardContainer.addEventListener('pointerdown', (e) => {
      context.elements.buttonCardContainer.setPointerCapture(e.pointerId);

      if (context.card.classList.contains('is-unavailable')) {
          return;
      }

      context.dragging = true;
      initialX = e.pageX || (e.touches ? e.touches[0].pageX : 0);

      context.elements.buttonCardContainer.classList.add('is-dragging');
      context.elements.buttonCardContainer.addEventListener('pointermove', onPointerMove);
      context.elements.buttonCardContainer.addEventListener('pointerup', onPointerUp);
  });

  function onPointerCancel() {
    context.dragging = false;

    context.elements.buttonCardContainer.classList.remove('is-dragging');
    context.elements.buttonCardContainer.removeEventListener('pointermove', onPointerMove);
    context.elements.buttonCardContainer.removeEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
      e.stopPropagation();

      const moveX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      if (Math.abs(initialX-moveX) > 10) {
        onSliderChange(context, moveX, true);
      }
  }
  function onPointerUp(e) {
      e.stopPropagation();

      context.dragging = false;

      const moveX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      onSliderChange(context, moveX);

      context.elements.buttonCardContainer.classList.remove('is-dragging');
      context.elements.buttonCardContainer.removeEventListener('pointermove', onPointerMove);
      context.elements.buttonCardContainer.removeEventListener('pointerup', onPointerUp);
  }
}
