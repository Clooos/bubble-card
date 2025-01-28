import { css, html, LitElement } from "lit";

export class HaCustomStyleSelector extends LitElement {
  static styles = css`
    a {
      color: var(--primary-text-color) !important;
    }

    code {
      background: var(--accent-color);
      background-blend-mode: darken;
      padding: 2px 4px;
      border-radius: 6px;
    }
  `;

  render() {
    return html`
      <ha-alert alert-type="info">For advanced users, you can edit the CSS style of this card in this editor. More information <a href="https://github.com/Clooos/Bubble-Card#styling">here</a>. You don't need to add <code>styles: |</code>, it will be added automatically. You can also add <a href="https://github.com/Clooos/Bubble-Card#templates">templates</a>.</ha-alert>
    `;
  }
}

customElements.define("ha-selector-custom_style_alert", HaCustomStyleSelector);
