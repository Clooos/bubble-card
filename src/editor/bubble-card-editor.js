import {
    LitElement,
    html,
    css,
    unsafeCSS
} from 'lit';
import { version } from '../var/version.js';
import { fireEvent } from '../tools/utils.js';
import { renderButtonEditor } from '../cards/button/editor.js';
import { renderPopUpEditor } from '../cards/pop-up/editor.js';
import { renderSeparatorEditor } from '../cards/separator/editor.js';
import { renderHorButtonStackEditor } from '../cards/horizontal-buttons-stack/editor.js';
import { renderCoverEditor } from '../cards/cover/editor.js';
import { renderClimateEditor } from '../cards/climate/editor.js';
import { renderSelectEditor } from '../cards/select/editor.js';
import { renderCalendarEditor } from '../cards/calendar/editor.js';
import { renderMediaPlayerEditor } from '../cards/media-player/editor.js';
import { renderEmptyColumnEditor } from '../cards/empty-column/editor.js';
import { yamlKeysMap, loadYAMLStyles } from '../tools/style-utils.js'
import setupTranslation from '../tools/localize.js';
import styles from './styles.css'

class BubbleCardEditor extends LitElement {

    setConfig(config) {
        this._config = {
            ...config
        };
    }

    static get properties() {
        return {
            hass: {},
            _config: {}
        };
    }

    get _card_type() {
        return this._config?.card_type || '';
    }

    get _button_type() {
        return this._config?.button_type || 
               (this._config?.card_type === 'pop-up' ? '' : 'switch');
    }

    get _entity() {
        return this._config?.entity || '';
    }

    get _selectable_attributes() {
        return [
            'source_list', 
            'sound_mode_list',
            'hvac_modes',
            'fan_modes',
            'swing_modes',
            'preset_modes',
            'effect_list'
        ];
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        const t = setupTranslation(this.hass);
        const homeAssistant = document.querySelector("body > home-assistant");
        if (homeAssistant?.shadowRoot) {
            const root = homeAssistant.shadowRoot;
            const dialog = root.querySelector("hui-dialog-edit-card")?.shadowRoot;

            if (dialog) {
                const previewElement = dialog.querySelector("ha-dialog > div.content > div.element-preview");

                if (!previewElement) return;

                // Change the default preview element to be sticky
                if (previewElement.style.position !== 'sticky') {
                    previewElement.style.position = 'sticky';
                    previewElement.style.top = '0';
                }
            }
        }

        if (!this.listsUpdated) {
            const formateList = item => ({
                label: item,
                value: item
            });

            this.inputSelectList = {states:{}, locale : this.hass.locale, localize : this.hass.localize, entities : this.hass.entities };

            Object.keys(this.hass.states)
                .filter((eid) => {
                    const entity = this.hass.states[eid];
                    const domain = eid.substr(0, eid.indexOf("."));
                    const isSelectDomain = domain === "input_select" || domain === "select";
                    const hasSelectableAttributes = this._selectable_attributes.some(attr => entity.attributes?.[attr]);
                    return isSelectDomain || hasSelectableAttributes;
                })
                .map(formateList).forEach((item) => {
                        const entityId = item.label || item;
                        const entity = this.hass.states[entityId]; // Retrieve the corresponding state from hass.states
                        if (entity) {
                            this.inputSelectList.states[entityId] = entity;
                        }
                    });

            this.attributeList = Object.keys(this.hass.states[this._entity]?.attributes || {}).map((attributeName) => {
                let entity = this.hass.states[this._entity];
                let formattedName = this.hass.formatEntityAttributeName(entity, attributeName);
                return { label: formattedName, value: attributeName };
            });

            this.cardTypeList = [{
                    'label': 'Button (Switch, slider, ...)',
                    'value': 'button'
                },
                {
                    'label': t('editor.calendar.name'),
                    'value': 'calendar'
                },
                {
                    'label': 'Cover',
                    'value': 'cover'
                },
                {
                    'label': 'Climate',
                    'value': 'climate'
                },
                {
                    'label': 'Empty column',
                    'value': 'empty-column'
                },
                {
                    'label': 'Horizontal buttons stack',
                    'value': 'horizontal-buttons-stack'
                },
                {
                    'label': 'Media player',
                    'value': 'media-player'
                },
                {
                    'label': 'Pop-up',
                    'value': 'pop-up'
                },
                {
                    'label': 'Select',
                    'value': 'select'
                },
                {
                    'label': 'Separator',
                    'value': 'separator'
                }
            ];

            this.listsUpdated = true;
        }

        const cardTypeList = this.cardTypeList;
        const buttonTypeList = this.buttonTypeList;

        switch (this._config?.card_type) {
            case 'pop-up':
                return renderPopUpEditor(this);
            case 'button':
                return renderButtonEditor(this);
            case 'separator':
                return renderSeparatorEditor(this);
            case 'horizontal-buttons-stack':
                return renderHorButtonStackEditor(this);
            case 'cover':
                return renderCoverEditor(this);
            case 'media-player':
                return renderMediaPlayerEditor(this);
            case 'empty-column':
                return renderEmptyColumnEditor(this);
            case 'select':
                return renderSelectEditor(this);
            case 'climate':
                return renderClimateEditor(this);
            case 'calendar':
                return renderCalendarEditor(this);
            case undefined:
                return html`
                    <div class="card-config">
                        ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                        <ha-alert alert-type="info">You need to add a card type first. Please note that in some cases, a page refresh might be needed after exiting the editor.</ha-alert>
                        <img style="width: 100%; height: auto; border-radius: 24px;" src="https://raw.githubusercontent.com/Clooos/Bubble-Card/main/.github/bubble-card.gif">
                        <p>The <b>Bubble Card ${version}</b> changelog is available <a href="https://github.com/Clooos/Bubble-Card/releases/tag/${version}"><b>here</b></a>.</p>
                        <hr />
                        <p>If you have an issue or a question you can find more details in the GitHub documentation. You can also find useful resources and help in these links.</p>
                        <div style="display: inline-block;">
                            <a href="https://github.com/Clooos/Bubble-Card"><img src="https://img.shields.io/badge/GitHub-Documentation-blue?logo=github"></a>
                            <a href="https://www.youtube.com/@cloooos"><img src="https://img.shields.io/badge/YouTube-My%20channel-red?logo=youtube"></a>
                            <a href="https://www.reddit.com/r/BubbleCard/"><img src="https://img.shields.io/badge/Reddit-r/BubbleCard-orange?logo=reddit"></a>
                            <a href="https://community.home-assistant.io/t/bubble-card-a-minimalist-card-collection-for-home-assistant-with-a-nice-pop-up-touch/609678"><img src="https://img.shields.io/badge/Home%20Assistant-Community%20Forum-blue?logo=home-assistant"></a>
                        </div>
                        <hr />
                        <p>I dedicate most of my spare time to making this project the best it can be. So if you appreciate my work, any donation would be a great way to show your support.</p>
                        <div style="display: inline-block;">
                            <a href="https://www.buymeacoffee.com/clooos"><img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee"></a> 
                            <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR"><img src="https://img.shields.io/badge/Donate-PayPal-blue?logo=paypal"></img></a>
                        </div>
                        <p>Looking for more advanced examples? Check out my <a href="https://www.patreon.com/Clooos"><b>Patreon</b></a> for exclusive custom styles and templates!</p>
                        <a href="https://www.patreon.com/Clooos"><img src="https://img.shields.io/badge/Patreon-Clooos-orange?logo=patreon"></a>
                        <p style="margin-top: 0;">Thank you! 🍻</p>
                        ${this.makeVersion()}
                    </div>
                `;
        }
    }

    makeLayoutOptions() {
        return html`
            <ha-combo-box
                label="${this._config.card_type === "pop-up" ? 'Header card layout' : 'Card layout'}"
                .value="${this._config.card_layout || 'normal'}"
                .configValue="${"card_layout"}"
                .items="${[{label: 'Normal', value: 'normal'}, {label: 'Large (Optimized for sections)', value: 'large'}, {label: 'Large with 2 sub-buttons rows (Optimized for sections)', value: 'large-2-rows'}]}"
                @value-changed="${this._valueChanged}"
            ></ha-combo-box>
        `;
    }

    makeShowState(context = this._config, config = '', array = false, index) {
        const entity = context?.entity ?? this._config.entity ?? '';
        const nameButton = this._config.button_type === 'name';

        const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || context.select_attribute;

        const attributeList = Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
            let state = this.hass.states[entity];
            let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
            return { label: formattedName, value: attributeName };
        });

        return html`
            ${array !== 'sub_button' ? html`
                <ha-formfield .label="Optional - Text scrolling effect">
                    <ha-switch
                        aria-label="Optional - Text scrolling effect"
                        .checked=${context?.scrolling_effect ?? true}
                        .configValue="${config + "scrolling_effect"}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { scrolling_effect: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Text scrolling effect</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            ${array === 'sub_button' ? html`
                <ha-formfield .label="Optional - Show background">
                    <ha-switch
                        aria-label="Optional - Show background when entity is on"
                        .checked=${context?.show_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { show_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show background when entity is on</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            ${array === 'sub_button' && (context?.show_background ?? true) ? html`
                <ha-formfield .label="Optional - Background color based on state">
                    <ha-switch
                        aria-label="Optional - Background color based on state"
                        .checked=${context?.state_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { state_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Background color based on state</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            ${array === 'sub_button' && (context?.state_background ?? true) && entity.startsWith("light") ? html`
                <ha-formfield .label="Optional - Background color based on light color">
                    <ha-switch
                        aria-label="Optional - Background color based on light color"
                        .checked=${context?.light_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { light_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Background color based on light color</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            ${array !== 'sub_button' && entity.startsWith("light") ? html`
                <ha-formfield .label="Optional - Use accent color instead of light color">
                    <ha-switch
                        aria-label="Optional - Use accent color instead of light color"
                        .checked=${context?.use_accent_color ?? false}
                        .configValue="${config + "use_accent_color"}"
                        @change="${this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Use accent color instead of light color</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            <ha-formfield .label="Optional - Show icon">
                <ha-switch
                    aria-label="Optional - Show icon"
                    .checked=${context?.show_icon ?? true}
                    .configValue="${config + "show_icon"}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_icon: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show icon</label> 
                </div>
            </ha-formfield>
            ${array !== 'sub_button' ? html`
                <ha-formfield .label="Optional - Prioritize icon over entity picture">
                    <ha-switch
                        aria-label="Optional - Prioritize icon over entity picture"
                        .checked=${context?.force_icon ?? false}
                        .configValue="${config + "force_icon"}"
                        .disabled="${nameButton}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { force_icon: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Prioritize icon over entity picture</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            <ha-formfield .label="Optional - Show name">
                <ha-switch
                    aria-label="Optional - Show name"
                    .checked=${context?.show_name ?? array !== 'sub_button' ? true : false}
                    .configValue="${config + "show_name"}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_name: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show name</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show entity state">
                <ha-switch
                    aria-label="Optional - Show entity state"
                    .checked="${context?.show_state ?? context.button_type === 'state'}"
                    .configValue="${config + "show_state"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_state: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show entity state</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show last changed">
                <ha-switch
                    aria-label="Optional - Show last changed"
                    .checked=${context?.show_last_changed}
                    .configValue="${config + "show_last_changed"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_last_changed: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show last changed</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show attribute">
                <ha-switch
                    aria-label="Optional - Show attribute"
                    .checked=${context?.show_attribute}
                    .configValue="${config + "show_attribute"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_attribute: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show attribute</label> 
                </div>
            </ha-formfield>
            ${context?.show_attribute ? html`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="Optional - Attribute to show"
                        .value="${context?.attribute}"
                        .configValue="${config + "attribute"}"
                        .items="${attributeList}"
                        .disabled="${nameButton}"
                        @value-changed="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { attribute: ev.detail.value }, array)}"
                    ></ha-combo-box>
                </div>
            ` : ''}
            ${array === 'sub_button' && isSelect ? html`
                <ha-formfield .label="Optional - Show arrow (Select entities only)">
                    <ha-switch
                        aria-label="Optional - Show arrow (Select entities only)"
                        .checked=${context?.show_arrow ?? true}
                        .configValue="${config + "show_arrow"}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_arrow: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show arrow (Select menu only)</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            ${array !== 'sub_button' && this._button_type === 'slider' ? html`
                <ha-formfield .label="Optional - Slider live update">
                    <ha-switch
                        aria-label="Optional - Slider live update"
                        .checked=${this._config.slider_live_update ?? false}
                        .configValue="${"slider_live_update"}"
                        @change=${this._valueChanged}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Slider live update</label> 
                    </div>
                </ha-formfield>
                <ha-alert alert-type="info">By default, sliders are updated only on release. You can toggle this option to enable live updates while sliding.</ha-alert>
            ` : ''}
        `;
    }

    makeDropdown(label, configValue, items, disabled) {
        if (label.includes('icon') || label.includes('Icon')) {
            return html`
                <div class="ha-icon-picker">
                    <ha-icon-picker
                        label="${label}"
                        .value="${this['_' + configValue]}"
                        .configValue="${configValue}"
                        item-value-path="icon"
                        item-label-path="icon"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                </div>
            `;
        } else {
            return html`
            <div class="ha-combo-box">
                <ha-combo-box
                    label="${label}"
                    .value="${this['_' + configValue]}"
                    .configValue="${configValue}"
                    .items="${items}"
                    .disabled="${disabled}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
            </div>
          `;
        }
    }

    makeActionPanel(label, context = this._config, defaultAction, array, index = this._config) {
        const icon = label === "Tap action" 
            ? "mdi:gesture-tap" 
            : label === "Double tap action" 
            ? "mdi:gesture-double-tap"
            : label === "Hold action" 
            ? "mdi:gesture-tap-hold"
            : "mdi:gesture-tap";
        const configValueType = label === "Tap action" 
            ? "tap_action"
            : label === "Double tap action" 
            ? "double_tap_action"
            : label === "Hold action" 
            ? "hold_action"
            : label === "Open action"
            ? "open_action"
            : "close_action";
        let value;
        try{
           value = label === "Tap action" 
                ? context.tap_action
                : label === "Double tap action" 
                ? context.double_tap_action
                : label === "Hold action" 
                ? context.hold_action
                : label === "Open action"
                ? context.open_action
                : context.close_action;
        }catch{}

        const isDefault = context === this._config;

        if (!defaultAction) {
            defaultAction = isDefault && label === "Tap action" 
            ? this._config.button_type !== "name" ? "more-info" : "none"
            : isDefault 
            ? this._config.button_type !== "name" ? "toggle" : "none"
            : '';
        }

        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="${icon}"></ha-icon>
                    ${label}
                </h4>
                <div class="content"> 
                    <ha-form
                        .hass=${this.hass}
                        .data=${context}
                        .configValue="${
                                      (array ? array+".":"") + (parseInt(index) == index ? index+".":"") +  configValueType}" 
                        .schema=${[{name: configValueType,
                                    label : label,
                                    selector: { ui_action: {
                                        default_action: defaultAction,} },
                                    }]}  
                        .computeLabel=${this._computeLabelCallback}
                        @value-changed=${(ev) => this._ActionChanged(ev,array,index)}
                    ></ha-form>
                </div>
                ${ value?.action  === 'call-service' || value?.action === 'perform-action' ? html`
                    <ha-formfield .label="Optional - Use default entity">
                        <ha-switch
                            aria-label="Optional - Use default entity"
                            .configValue="${
                                          (array ? array+".":"") + (parseInt(index) == index ? index+".":"") +  configValueType+".default_entity"}" 
                            .checked=${value?.target?.entity_id === "entity"}
                             @change=${this._updateActionsEntity}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Use default entity</label> 
                        </div>
                    </ha-formfield>
                ` : ''}
            </ha-expansion-panel>
        `;
    }

    makeSubButtonPanel() {
      const subButtonElements = this._config?.sub_button?.map((subButton, index) => {
        if (!subButton) {
          return;
        }

        const subButtonIndex = 'sub_button.' + index + '.';

        const removeSubButton = (event) => {
          event.stopPropagation();
          let subButtons = [...this._config.sub_button];
          subButtons.splice(index, 1);
          this._config.sub_button = subButtons;

          this._valueChanged({ target: { configValue: 'sub_button.' + (index - 1), value: subButton } });
          this.requestUpdate();
        };

        const moveSubButtonLeft = (event) => {
          event.stopPropagation();
          if (index > 0) {
            let subButtons = [...this._config.sub_button];
            [subButtons[index], subButtons[index - 1]] = [subButtons[index - 1], subButtons[index]];
            this._config.sub_button = subButtons;

            this._valueChanged({ target: { configValue: 'sub_button.' + index, value: this._config.sub_button[index] } });
          }
          this.requestUpdate();
        };

        const moveSubButtonRight = (event) => {
          event.stopPropagation();
          if (index < this._config.sub_button.length - 1) {
            let subButtons = [...this._config.sub_button];
            [subButtons[index], subButtons[index + 1]] = [subButtons[index + 1], subButtons[index]];
            this._config.sub_button = subButtons;

            this._valueChanged({ target: { configValue: 'sub_button.' + index, value: this._config.sub_button[index] } });
          }
          this.requestUpdate();
        };

        const entity = subButton.entity ?? this._config.entity;
        const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || subButton.select_attribute;
        const entityAttribute = this.hass.states[entity]?.attributes;
        const hasSelectAttributeList = this._selectable_attributes.some(attr => entityAttribute?.[attr]);
        const selectableAttributeList = Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
            let state = this.hass.states[entity];
            let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
            return { label: formattedName, value: attributeName };
        }).filter(attribute => this._selectable_attributes.includes(attribute.value));
        const conditions = subButton.visibility ?? [];

        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:border-radius"></ha-icon>
                    ${this._config.sub_button[index] ? "Button " + (index + 1) + (subButton.name ? " - " + subButton.name : "") : "New button"}
                    <button class="icon-button header" @click="${removeSubButton}">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </button>
                    ${index > 0 ? html`<button class="icon-button header" @click="${moveSubButtonLeft}">
                      <ha-icon icon="mdi:arrow-left"></ha-icon>
                    </button>` : ''}
                    ${index < this._config.sub_button.length - 1 ? html`<button class="icon-button header" @click="${moveSubButtonRight}">
                      <ha-icon icon="mdi:arrow-right"></ha-icon>
                    </button>` : ''}
                </h4>
                <div class="content">
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                            <ha-icon icon="mdi:cog"></ha-icon>
                            Button settings
                        </h4>
                        <div class="content"> 
                        <ha-form
                            .hass=${this.hass}
                            .data=${subButton}
                            .schema=${[
                                        { name: "entity",
                                          label: "Optional - Entity (default to card entity)", 
                                          selector: { entity: {} },
                                        },
                                    ]}   
                            .computeLabel=${this._computeLabelCallback}
                            @value-changed=${(ev) => this._arrayValueChange(index, ev.detail.value, 'sub_button')}
                        ></ha-form>
                            ${hasSelectAttributeList ? html`
                                <div class="ha-combo-box">
                                    <ha-combo-box
                                        label="Optional - Select menu (from attributes)"
                                        .value="${subButton.select_attribute}"
                                        .items="${selectableAttributeList}"
                                        @value-changed="${(ev) => this._arrayValueChange(index, { select_attribute: ev.detail.value }, 'sub_button')}"
                                    ></ha-combo-box>
                                </div>
                            ` : ''}
                            <div class="ha-textfield">
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${subButton.name ?? ''}"
                                    @input="${(ev) => this._arrayValueChange(index, { name: ev.target.value }, 'sub_button')}"
                                ></ha-textfield>
                            </div>
                            <div class="ha-icon-picker">
                                <ha-icon-picker
                                    label="Optional - Icon"
                                    .value="${subButton.icon}"
                                    item-label-path="label"
                                    item-value-path="value"
                                    @value-changed="${(ev) => this._arrayValueChange(index, { icon: ev.detail.value }, 'sub_button')}"
                                ></ha-icon-picker>
                            </div>
                            ${this.makeShowState(subButton, subButtonIndex, 'sub_button', index)}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined style="${isSelect ? 'opacity: 0.5; pointer-events: none;' : ''}">
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on button
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action", subButton, 'more-info', 'sub_button', index)}
                            ${this.makeActionPanel("Double tap action", subButton, 'none', 'sub_button', index)}
                            ${this.makeActionPanel("Hold action", subButton, 'none', 'sub_button', index)}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:eye"></ha-icon>
                        Visibility
                        </h4>
                        <div class="content">
                            <ha-card-conditions-editor
                                .hass=${this.hass}
                                .conditions=${conditions}
                                @value-changed=${(ev) => this._conditionChanged(ev, index, 'sub_button')}
                            >
                            </ha-card-conditions-editor>
                            <ha-alert alert-type="info">
                                The sub-button will be shown when ALL conditions are fulfilled. If no conditions are set, the sub-button will always be shown.
                            </ha-alert>
                        </div>
                    </ha-expansion-panel>
                </div>
            </ha-expansion-panel>
        `;
      });


      const addSubButton = () => {
        if (!this._config.sub_button) {
            this._config.sub_button = [];
        }

        let newSubButton = {
            entity: this._config.entity
        };
        this._config.sub_button = [...this._config.sub_button];
        this._config.sub_button.push(newSubButton);
        fireEvent(this, "config-changed", { config: this._config });
        this.requestUpdate();
      };

      // Return full panel for all sub-buttons
      return html`
        <ha-expansion-panel outlined>
          <h4 slot="header">
            <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
            Sub-buttons editor
          </h4>
          <div class="content">
            ${subButtonElements}
            <button class="icon-button" @click="${addSubButton}">
              <ha-icon icon="mdi:plus"></ha-icon>
              New sub-button
            </button>
            <ha-alert alert-type="info">
                Add new customized buttons fixed to the right. 
                These buttons can also display a select menu for your 
                <code>input_select</code>, <code>select</code> entities, and 
                any other entities that have attribute lists like 
                <code>source_list</code>, <code>sound_mode_list</code>, 
                <code>hvac_modes</code>, <code>fan_modes</code>, 
                <code>swing_modes</code>, <code>preset_modes</code>, or 
                <code>effect_list</code>.
            </ha-alert>
          </div>
        </ha-expansion-panel>
      `;
    }

    makeVersion() {
        return html`
            <h4 class="version">
                Bubble Card 
                <span class="version-number">
                    ${version}
                </span>
            </h4>
        `;
    }

    makeStyleEditor() {
        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                    Custom styles & templates - This card
                </h4>
                <div class="content">
                    <div class="code-editor">
                        <ha-code-editor
                            mode="yaml"
                            autofocus
                            autocomplete-entities
                            autocomplete-icons
                            .hass=${this.hass}
                            .value=${this._config.styles}
                            .configValue="${"styles"}"
                            @value-changed=${this._valueChanged}
                        ></ha-code-editor>
                    </div>
                    ${this.createErrorConsole()}
                    <ha-alert alert-type="info">
                      For advanced users, you can edit the CSS style of this card in this editor. More information <a href="https://github.com/Clooos/Bubble-Card#styling">here</a>. You don't need to add <code>styles: |</code>, it will be added automatically. You can also add <a href="https://github.com/Clooos/Bubble-Card#templates">templates</a>.
                      <br><br><b>Looking for more advanced examples?</b> Check out my <a href="https://www.patreon.com/Clooos">Patreon</a> for exclusive custom styles and advanced templates, this is also the best way to show your support to my project!
                    </ha-alert>
                </div>
            </ha-expansion-panel>
        `;
    }

    createErrorConsole() {        
        if (!this._errorListener) {
            this._errorListener = (event) => {
                this.errorMessage = event.detail;
                this.requestUpdate();
            };
            window.addEventListener('bubble-card-error', this._errorListener);
        }

        return html`
            <ha-alert 
                alert-type="error"
                style="display: ${!this.errorMessage ? 'none' : ''}">
                ${this.errorMessage}
            </ha-alert>
        `;
    }

    _valueChangedForTemplate(e, key) {
      const newValue = e.detail.value;
      let finalValue = newValue;

      if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
        const keys = Object.keys(newValue);
        if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k, 10)))) {
          finalValue = keys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map(k => newValue[k]);
        }
      }

      this._config = {
        ...this._config,
        [key]: finalValue,
      };
      fireEvent(this, "config-changed", { config: this._config });
      this.requestUpdate();
    }

    makeModulesEditor() {
      const resolvePath = (path, configData) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], configData);
      };

      const processSchema = (schema, configData, baseKey = null) => {
        return schema.map(field => {
          if (
            field.selector &&
            field.selector.attribute &&
            typeof field.selector.attribute.entity_id === 'string'
          ) {
            let ref = field.selector.attribute.entity_id;
            let resolved;

            if (ref.startsWith("config.")) {
              ref = ref.slice("config.".length);
              resolved = resolvePath(ref, this._config);
            } else {
              if (baseKey && ref.startsWith(baseKey + '.')) {
                ref = ref.slice(baseKey.length + 1);
              }
              if (ref.includes('.')) {
                resolved = resolvePath(ref, configData);
              } else if (configData && ref in configData) {
                resolved = configData[ref];
              }
            }
            if (resolved !== undefined) {
              field.selector.attribute.entity_id = resolved;
            }
          }
          if (field.schema && Array.isArray(field.schema)) {
            field.schema = processSchema(field.schema, configData, baseKey);
          }
          return field;
        });
      };

      const getTextFromMap = (key) => {
        const value = yamlKeysMap.get(key) || {};
        let name = value.name || key;
        let description = value.description || '';
        let formSchema = value.editor || [];
        let unsupportedCard = value.unsupported || [];
        let creator = value.creator || '';
        let moduleLink = value.link || '';
        let moduleVersion = value.version || '';

        if (!Array.isArray(formSchema)) {
          formSchema = [formSchema];
        }

        if (!Array.isArray(unsupportedCard)) {
          unsupportedCard = [unsupportedCard];
        }

        return { name, description, formSchema, unsupportedCard, moduleVersion, creator, moduleLink };
      };

      const handleValueChanged = (event) => {
        const target = event.target;
        const value = target.configValue;
        const isChecked = target.checked;

        if (!this._config.style_templates) {
          this._config.style_templates = [];
        }

        if (isChecked) {
          if (!this._config.style_templates.includes(value)) {
            this._config.style_templates = [...this._config.style_templates, value];
          }
        } else {
          this._config.style_templates = this._config.style_templates.filter((key) => key !== value);
        }

        fireEvent(this, "config-changed", { config: this._config });
        this.requestUpdate();
      };

      const styleTemplates = this._config.style_templates || ['default'];

      return html`
        <ha-expansion-panel outlined>
          <h4 slot="header">
            <ha-icon icon="mdi:puzzle"></ha-icon>
            Modules
          </h4>
          <div class="content">
            ${Array.from(yamlKeysMap.keys()).map((key) => {
              const { 
                name: label, 
                description, 
                formSchema, 
                unsupportedCard,
                creator,
                moduleLink,
                moduleVersion
              } = getTextFromMap(key);
              const isChecked = (this._config.style_templates || ['default']).includes(key);
              const unsupported = unsupportedCard.includes(this._config.card_type ?? "");
              let processedFormSchema = formSchema;
              if (formSchema && formSchema.length > 0) {
                processedFormSchema = processSchema(
                  JSON.parse(JSON.stringify(formSchema)),
                  this._config[key] || {},
                  key
                );
              }

              return html`
                <ha-expansion-panel 
                    outlined 
                    class="${unsupported ? 'disabled' : ''}"
                >
                  <h4 slot="header">
                    <ha-icon
                      icon="${isChecked ? 'mdi:puzzle-check' : 'mdi:puzzle-outline'}"
                      style="opacity: ${isChecked ? '1' : '0.3'}"
                    ></ha-icon>
                    ${label}
                  </h4>
                  <div class="content">
                    <ha-formfield .label=${'Apply to this card'}>
                      <ha-switch
                        aria-label="Apply to this card"
                        .checked=${isChecked}
                        .configValue=${key}
                        @change=${handleValueChanged}
                      ></ha-switch>
                    </ha-formfield>
                    <hr>

                    ${processedFormSchema.length > 0
                      ? html`
                        <h4 class="${!isChecked ? 'disabled' : ''}">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Configuration
                        </h4>
                        <ha-form 
                          class="${!isChecked ? 'disabled' : ''}"
                          .hass=${this.hass}
                          .data=${this._config[key]}
                          .schema=${processedFormSchema}
                          .computeLabel=${this._computeLabelCallback}
                          .disabled=${!isChecked}
                          @value-changed=${(e) => this._valueChangedForTemplate(e, key)}
                        ></ha-form>
                        <hr>
                        `
                    : ''}

                    <ha-alert alert-type="info" style="display: ${!description ? 'none' : ''}">
                      ${html`<span .innerHTML=${description}></span>`}
                    </ha-alert>

                    ${creator || moduleLink || moduleVersion
                      ? html`
                        <h4 class="version module-version">
                          ${creator ? `Created by ${creator}` : ''}
                          <span class="version-number">
                            ${moduleLink ? html`<a href="${moduleLink}">Module link</a> • ` : ''}
                            ${moduleVersion || ''}
                          </span>
                        </h4>
                        `
                    : ''}
                  </div>
                </ha-expansion-panel>
              `;
            })}
            ${this.createErrorConsole()}
            <a class="icon-button" href="https://github.com/Clooos/Bubble-Card/discussions/categories/share-your-modules">
              <ha-icon icon="mdi:open-in-new"></ha-icon>
              Community Modules
            </a>
            <ha-alert alert-type="warning" style="display: ${!window.bubbleYamlWarning ? 'none' : ''}">
              <b>If you want to edit or add modules here</b>, first copy
              <code>bubble-modules.yaml</code> from <code>/www/community/Bubble-Card/</code> (if installed via HACS) to
              <code>/www/bubble/</code> (you'll need to create this folder). Make sure to refresh your page after each modification.
            </ha-alert>
            <ha-alert alert-type="info">
              Modules are the best way to apply <a href="https://github.com/Clooos/Bubble-Card#styling">custom styles</a> and/or <a href="https://github.com/Clooos/Bubble-Card#templates">custom templates</a> to your cards, as they are managed in a single external YAML file. 
              This makes it easy to change things like the styles of all your cards, and for advanced users, to add or modify features. <br><br>The best approach when starting is to first test your changes in the "Custom styles & templates" editor under "Styling options" for a live preview, and once it's working, try to add it as a module. 
              It's a good idea to check out <code>bubble-module.yaml</code> to see the possibilities.
            </ha-alert>
          </div>
        </ha-expansion-panel>
      `;
    }

    _valueChanged(ev) {
        const target = ev.target;
        const detail = ev.detail;
        let rawValue;

        // Check if the target is a ha-switch
        if (target.tagName === 'HA-SWITCH') {
            rawValue = target.checked;
        } else if (target.value !== undefined) {
            rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
        }

        if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
            return;
        }

        const { configValue, checked } = target;
        if (configValue) {
            const value = checked !== undefined ? checked : rawValue;
            const configKeys = configValue.split('.');
            let obj = this._config;

            for (let i = 0; i < configKeys.length - 1; i++) {
                obj[configKeys[i]] = obj[configKeys[i]] || {};
                obj = obj[configKeys[i]];
            }

            // If the event is of type 'input', update the configuration directly with the input's value
            if (ev.type === 'input') {
                obj[configKeys[configKeys.length - 1]] = rawValue;
            } else if (detail && obj[configKeys[configKeys.length - 1]] !== detail.value) {
                obj[configKeys[configKeys.length - 1]] = detail.value;
            } else if (target.tagName === 'HA-SWITCH') {
                obj[configKeys[configKeys.length - 1]] = rawValue;
            }
        }else{
            this._config = detail.value;
        }

        fireEvent(this, "config-changed", { config: this._config });
        this.requestUpdate();
    }

    _arrayValueChange(index, value, array) {
        // Fix the climate sub-button addition
        if (this._config.sub_button && !this.subButtonJustAdded) {
            this.subButtonJustAdded = true;
            setTimeout(() => this._arrayValueChange(index, value, array), 10);
            return;
        }

        this._config[array] = this._config[array] || [];
        let arrayCopy = [...this._config[array]];
        arrayCopy[index] = arrayCopy[index] || {};
        arrayCopy[index] = { ...arrayCopy[index], ...value };
        this._config[array] = arrayCopy;
        fireEvent(this, "config-changed", { config: this._config });
        this.requestUpdate();
    }

    _ActionChanged(ev,array,index) {
        var hasDefaultEntity = false;
        try{if(ev.detail.value[ev.currentTarget.__schema[0].name]['target']['entity_id'][0] === 'entity') hasDefaultEntity = true;}
          catch{}
        try{if(ev.detail.value[ev.currentTarget.__schema[0].name]['target']['entity_id'] === 'entity') hasDefaultEntity = true;}
          catch{}
        if(hasDefaultEntity){
            ev.detail.value[ev.currentTarget.__schema[0].name]['action'] = 'call-service';
            if(ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action']!= undefined){
                ev.detail.value[ev.currentTarget.__schema[0].name]['service'] = ""+ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action'] ;
                delete ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action'];
                }
          }

        if( array === 'button_action'){
            var configExist= this._config[array] ? true : false;
            var valueWasChanged = ev.detail.value[ev.currentTarget.__schema[0].name] != null
            if (configExist || valueWasChanged) this._config[array] = ev.detail.value;
        }else if (array) {
            this._config[array] = this._config[array] || [];
            let arrayCopy = [...this._config[array]];
            arrayCopy[index] = ev.detail.value;
            this._config[array] = arrayCopy;
        } else {
            this._config = ev.detail.value;
        }

        fireEvent(this, "config-changed", { config: this._config});
    }

    _updateActionsEntity(ev){
        let obj = JSON.parse(JSON.stringify(this._config)); //get rid of the referencing 
        const configKeys = ev.target.configValue.split('.');
        let i = 0
        for (i = 0; i < configKeys.length - 2; i++) {
            obj = obj[configKeys[i]] ? obj[configKeys[i]] : {};
        }

        if (!ev.target.checked){
            if(obj[configKeys[i]].target?.entity_id ==='entity'){
                obj[configKeys[i]]['target']={};
              }
          }else{
            obj[configKeys[i]]['target']={'entity_id':'entity'};    
          }

        var detail ={'value':obj};
        var currentTarget = {'__schema':[{'name':configKeys[configKeys.length - 2]}]};
        var newev = {...ev,detail ,currentTarget};

        this._ActionChanged(newev,configKeys.length >2 ? configKeys[0] : null,configKeys.length >3 ? configKeys[1] : null);
    }

    _computeLabelCallback = (schema) => {
        return schema.label;
    }

    _conditionChanged(ev, index, array) {
        ev.stopPropagation();

        if (array) {
            this._config[array] = this._config[array] || [];
            let arrayCopy = [...this._config[array]];
            arrayCopy[index] = arrayCopy[index] || {};
            const conditions = ev.detail.value;
            arrayCopy[index] = { 
                ...arrayCopy[index],
                visibility: conditions 
            };
            this._config[array] = arrayCopy;
        } else if (this._config.card_type === 'pop-up') {
            const conditions = ev.detail.value;
            this._config = { 
                ...this._config,
                trigger: conditions 
            };
        }

        fireEvent(this, "config-changed", { config: this._config });
        this.requestUpdate();
    }

    static get styles() {
        return css`
            ${unsafeCSS(styles)}
          `;
      }
  }

  customElements.define('bubble-card-editor', BubbleCardEditor);
