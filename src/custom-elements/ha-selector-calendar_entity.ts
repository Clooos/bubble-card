import { html, LitElement } from "lit";
import { fireEvent } from "../tools/utils.ts";
import { hashCode, intToRGB } from "../cards/calendar/helpers.ts";
import setupTranslation from "../tools/localize.ts";

const computeLabel = (schema) => {
  return schema.title || schema.label;
}

export class HaCalendarEntitySelector extends LitElement {
  getSchema(entity) {
    const t = setupTranslation(this.hass);

    return [{
      type: "expandable",
      name: "",
      title: entity
        ? this.hass.states[entity].attributes.friendly_name || entity
        : t('editor.calendar.new_calendar'),
      schema: [
        {
          name: 'entity',
          title: t('editor.calendar.entity'),
          selector: { entity: { domain: ['calendar'] } },
        },
        {
          name: "color",
          title: t('editor.calendar.color'),
          selector: { ui_color: {} },
        },
      ]
    }]
  }

  static properties = {
    hass: {},
    value: {},
    label: {},
  }
  
  constructor() {
    super();
  }

  render() {
    const t = setupTranslation(this.hass);
    const addCalendar = () => {
      this.value[this.value.length] = { entity: '', color: '' };
      this.valueChanged({ detail: { value: this.value } });
    }
    
    return html`
      ${this.value.map((entity, index) => {
        const valueChanged = (ev) => {
          ev.stopPropagation();
          this.value[index] = ev.detail.value;
          this.valueChanged({ detail: { value: this.value } });
        }
          
        return html`
          <div style="margin-bottom: 24px">
            <ha-form
              .data=${entity}
              .schema=${this.getSchema(entity.entity)}
              .hass=${this.hass}
              .computeLabel=${computeLabel}
              @value-changed=${valueChanged}
            ></ha-form>
          </div>
        `;
      })}
      <ha-button @click=${addCalendar}>${t('editor.calendar.new_calendar')}</ha-button>
    `;
  }

  valueChanged(ev) {
    const value = ev.detail.value
      .map((e) => {
        const defaultColor = e.entity ? intToRGB(hashCode(e.entity)) : '';

        return{
          entity: e.entity,
          color: e.color || defaultColor
        }
      });

    fireEvent(this, "value-changed", { value }, undefined);
  }
}

customElements.define("ha-selector-calendar_entity", HaCalendarEntitySelector);
