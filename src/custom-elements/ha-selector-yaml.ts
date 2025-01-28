import { css, html, nothing, LitElement } from "lit";
import { fireEvent } from "../tools/utils.ts";

export class HaYamlSelector extends LitElement {
  static properties = {
    hass: {},
    value: {},
    label: {},
    helper: {},
    disabled: {},
    required: {},
  };

  render() {
    return html`
      ${this.label
        ? html`<p>${this.label}${this.required ? "*" : ""}</p>`
        : nothing}
      <ha-code-editor
        mode="jinja2"
        .hass=${this.hass}
        .value=${this.value}
        .readOnly=${this.disabled}
        autofocus
        autocomplete-entities
        autocomplete-icons
        @value-changed=${this._handleChange}
        dir="ltr"
        linewrap
      ></ha-code-editor>
      ${this.helper
        ? html`<ha-input-helper-text>${this.helper}</ha-input-helper-text>`
        : nothing}
    `;
  }

  _handleChange(ev) {
    const value = ev.target.value;
    if (this.value === value) {
      return;
    }
    fireEvent(this, "value-changed", { value }, undefined);
  }

  static get styles() {
    return css`
      p {
        margin-top: 0;
      }
    `;
  }
}

customElements.define("ha-selector-yaml", HaYamlSelector);
