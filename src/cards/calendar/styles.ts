export default `
  * {
    -webkit-tap-highlight-color: transparent !important;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  ha-card {
    margin-top: 0;
    background: none;
    opacity: 1;
  }
  .bubble-calendar {
    position: relative;
    width: 100%;
    background-color: var(--bubble-calendar-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));
    border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));
    overflow: scroll;
    touch-action: pan-y;
    height: var(--bubble-calendar-height, 56px);
    display: flex;
    width: 100%;
    gap: 8px;
  }
  .bubble-calendar-wrapper::after {
    content: "";
    height: 28px;
    width: 100%;
    position: absolute;
    bottom: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s, transform .2s;
    background: linear-gradient(to top, var(--bubble-calendar-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color)))), transparent);
  }
  .is-overflowing::after {
    opacity: 1;
  }
  .bubble-calendar-content {
    flex-grow: 1;
    min-width: 0;
  }
  .bubble-sub-button-container {
    flex-shrink: 0;
  }
  .bubble-day-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 8px;
    padding: 7px 16px 7px 8px;
    position: relative;
  }
  .bubble-day-wrapper + .bubble-day-wrapper::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 62px;
    right: 16px;
    height: 2px;
    background-color: var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));
  }
  .bubble-day-chip {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));
    background-color: var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));
    position: relative;
  }
  .bubble-day-number {
    font-size: 24px;
    line-height: 20px;
    font-weight: 600;
  }
  .bubble-day-month {
    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
  }
  .bubble-day-events {
    width: 100%;
    border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));
    min-width: 0;
  }
  .bubble-event {
    background-color: var(--bubble-event-background-color);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 6px;
    border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));
  }
  .bubble-event-time {
    font-size: 12px;
    line-height: 21px;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .bubble-event-color {
    height: 12px;
    width: 12px;
    border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));
    flex-shrink: 0;
    flex-grow: 0;
  }
  .bubble-event-name {
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    max-width: 100%;
    min-width: 0;
    flex-shrink: 1;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;