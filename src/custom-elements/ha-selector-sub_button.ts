import { html, LitElement } from "lit";
import { fireEvent } from "../tools/utils.ts";
import { hashCode, intToRGB } from "../cards/calendar/helpers.ts";
import setupTranslation from "../tools/localize.ts";

const computeLabel = (schema) => {
  return schema.title || schema.label;
}

const ACTIONS = [
  'more-info',
  'toggle',
  'navigate',
  'url',
  'call-service',
  'assist',
  'none',
]


export class HaSubButtonSelector extends LitElement {
  getSchema(entity, subButton, index) {
    const t = setupTranslation(this.hass);

    const showArrowSchema = entity?.startsWith("input_select") || entity?.startsWith("select")
      ? [{
        name: "show_arrow",
        title: t('editor.common.show_arrow'),
        selector: { boolean: {} }
      }]
      : [];

    const attributeList = Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
        let state = this.hass.states[entity];
        let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
        return { label: formattedName, value: attributeName };
    });

    const attributeSchema = subButton.show_attribute === true
      ? [{
          name: "attribute",
          title: t('editor.common.attribute'),
          selector: {
            select: {
              options: attributeList,
              mode: "dropdown",
              sort: true,
            }
          }
        }]
      : [];

    return [{
      type: "expandable",
      name: "",
      title: entity
        ? this.hass.states[entity].attributes.friendly_name || entity
        : `${t('editor.common.new_sub_button')} ${index + 1}`,
      icon: "mdi:border-radius",
      schema: [
        {
          type: "expandable",
          name: "",
          title: t('editor.common.sub_button_settings'),
          icon: "mdi:cog",
          schema: [
            {
              name: "entity",
              title: t('editor.common.entity'),
              selector: { entity: {} },
            },
            {
              name: "name",
              title: t('editor.common.name'),
              selector: { text: {} },
            },
            {
              name: "icon",
              title: t('editor.common.icon'),
              selector: { icon: {} },
            },
            {
              name: "show_background",
              title: t('editor.common.show_background'),
              selector: { boolean: {} },
            },
            {
              name: "show_icon",
              title: t('editor.common.show_icon'),
              selector: { boolean: {} },
            },
            {
              name: 'show_name',
              title: t('editor.common.show_name'),
              selector: { boolean: {} },
            },
            {
              name: "show_state",
              title: t('editor.common.show_state'),
              selector: { boolean: {} },
            },
            {
              name: "show_last_changed",
              title: t('editor.common.show_last_changed'),
              selector: { boolean: {} },
            },
            {
              name: "show_attribute",
              title: t('editor.common.show_attribute'),
              selector: { boolean: {} },
            },
            ...attributeSchema,
            ...showArrowSchema,
          ]
        },
        {
          type: "expandable",
          name: "",
          title: t('editor.common.sub_button_actions'),
          icon: "mdi:gesture-tap",
          schema: [
            {
              name: "tap_action",
              selector: { "ui-action": { actions: ACTIONS } },
            },
            {
              name: "hold_action",
              selector: { "ui-action": { actions: ACTIONS } },
            },
            {
              name: "double_tap_action",
              selector: { "ui-action": { actions: ACTIONS } },
            },
          ]
        }
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

  get _value() {
    return this.value ?? [];
  }

  render() {
    const t = setupTranslation(this.hass);
    const addSubButton = () => {
      this.value = this._value;
      this.value[this._value.length] = {
        show_background: true,
        show_icon: true,
      };
      this._valueChanged({ detail: { value: this._value } });
    }

    return html`
      ${this._value.map((subButton, index) => {
        const valueChanged = (ev) => {
          ev.stopPropagation();
          this._value[index] = ev.detail.value;
          debugger;
          this._valueChanged({ detail: { value: this._value } });
        }

        return html`
          <div style="margin-bottom: 24px">
            <ha-form
              .data=${subButton}
              .schema=${this.getSchema(subButton.entity, subButton, index)}
              .hass=${this.hass}
              .computeLabel=${computeLabel}
              @value-changed=${valueChanged}
            ></ha-form>
          </div>
        `;
      })}
      <ha-button @click=${addSubButton}>${t('editor.common.new_sub_button')}</ha-button>
    `;
  }

  _valueChanged(ev) {
    const value = ev.detail.value ?? [];
    debugger;

    fireEvent(this, "value-changed", { value }, undefined);
  }
}

customElements.define("ha-selector-sub_button", HaSubButtonSelector);
