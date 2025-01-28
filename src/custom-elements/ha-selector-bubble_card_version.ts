import { css, html, LitElement } from "lit";

export class HaBubbleCardVersionSelector extends LitElement {
  static properties = {
    selector: {},
  }

  static styles = css`
    h4 {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 32px;
      color: #fff;
      font-size: 12px;
      padding: 8px 16px;
    }
    
    span {
      background: rgba(0,120,180,1);
      border-radius: 12px;
      color: white;
      float: right;
      font-size: 10px;
      margin-right: -6px;
      padding: 0px 8px;
    }
  `;

  render() {
    return html`
      <h4>
          Bubble Card 
          <span>
              ${this.selector.bubble_card_version.version}
          </span>
      </h4>
    `;
  }
}

customElements.define("ha-selector-bubble_card_version", HaBubbleCardVersionSelector);
