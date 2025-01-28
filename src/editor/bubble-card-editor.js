import { version } from '../var/version.js';
import { 
fireEvent,
isStateOn,
getState,
getAttribute,
getIcon 
} from '../tools/utils.js';
import {
LitElement,
html,
css
} from 'lit';
import setupTranslation from '../tools/localize.ts';
import "../custom-elements/ha-selector-calendar_entity.ts";
import "../custom-elements/ha-selector-custom_style_alert.ts";
import "../custom-elements/ha-selector-yaml.ts";
import "../custom-elements/ha-selector-bubble_card_version.ts";
import "../custom-elements/ha-selector-sub_button.ts";

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

    get _name() {
        return this._config?.name || '';
    }

    get _icon() {
        return this._config?.icon || '';
    }

    get _state() {
        return this._config?.state || '';
    }

    get _text() {
        return this._config?.text || '';
    }

    get _hash() {
        return this._config?.hash || '#pop-up-name';
    }

    get _trigger_entity() {
        return this._config?.trigger_entity || '';
    }

    get _trigger_state() {
        return this._config?.trigger_state || '';
    }

    get _trigger_close() {
        return this._config?.trigger_close || false;
    }

    get _margin() {
        return this._config?.margin || '7px';
    }

    get _margin_top_mobile() {
        return this._config?.margin_top_mobile || '0px';
    }

    get _margin_top_desktop() {
        return this._config?.margin_top_desktop || '0px';
    }

    get _width_desktop() {
        return this._config?.width_desktop || '540px';
    }

    get _bg_color() {
        return this._config?.bg_color || '';
    }

    get _bg_opacity() {
        return this._config?.bg_opacity !== undefined ? this._config?.bg_opacity : '88';
    }

    get _bg_blur() {
        return this._config?.bg_blur !== undefined ? this._config?.bg_blur : '10';
    }

    get _backdrop_blur() {
        return this._config?.backdrop_blur !== undefined ? this._config?.backdrop_blur : '0';
    }

    get _shadow_opacity() {
        return this._config?.shadow_opacity !== undefined ? this._config?.shadow_opacity : '0';
    }

    get _rise_animation() {
        return this._config?.rise_animation !== undefined ? this._config?.rise_animation : true;
    }

    get _auto_close() {
        return this._config?.auto_close || '';
    }

    get _close_on_click() {
        return this._config?.close_on_click || false;
    }

    get _close_by_clicking_outside() {
        return this._config?.close_by_clicking_outside ?? true;
    }

    get _background_update() {
        return this._config?.background_update || false;
    }

    get _icon_open() {
        return this._config?.icon_open || '';
    }

    get _icon_close() {
        return this._config?.icon_close || '';
    }

    get _icon_down() {
        return this._config?.icon_down || '';
    }

    get _icon_up() {
        return this._config?.icon_up || '';
    }

    get _open_service() {
        return this._config?.open_service || 'cover.open_cover';
    }

    get _close_service() {
        return this._config?.close_service || 'cover.close_cover';
    }

    get _stop_service() {
        return this._config?.stop_service || 'cover.stop_cover';
    }

    get _auto_order() {
        return this._config?.auto_order || false;
    }

    get _highlight_current_view() {
        return this._config?.highlight_current_view || false;
    }

    get _show_state() {
        const defaultState = this._config?.card_type === 'state' ? true : false;
        return this._config?.show_state || defaultState;
    }

    get _show_attribute() {
        const defaultState = this._config.card_type === 'state' ? true : false;
        return this._config.show_attribute || defaultState;
    }

    get _show_last_changed() {
        const defaultState = this._config.card_type === 'state' ? true : false;
        return this._config.show_last_changed || this._config.show_last_updated || defaultState;
    }

    get _attribute() {
        return this._config.attribute || false;
    }

    get _hide_backdrop() {
        return this._config.hide_backdrop ?? false;
    }

    get _hide_gradient() {
        return this._config.hide_gradient || false;
    }

    get _hide_play_pause_button() {
        return this._config.hide?.play_pause_button || false;
    }

    get _hide_next_button() {
        return this._config.hide?.next_button || false;
    }

    get _hide_previous_button() {
        return this._config.hide?.previous_button || false;
    }

    get _hide_volume_button() {
        return this._config.hide?.volume_button || false;
    }

    get _hide_power_button() {
        return this._config.hide?.power_button || false;
    }  

    get _sub_button() {
        return this._config.sub_button || '';
    }

    get _button_action() {
        return this._config.button_action || '';
    }

    get _open_action() {
        return this._config.open_action || '';
    }

    get _close_action() {
        return this._config.close_action || '';
    }

    get _show_header() {
        return this._config.show_header ?? true;
    }

    get _slide_to_close_distance() {
        return this._config.slide_to_close_distance ?? 400;
    }

    get _slider_live_update() {
        return this._config.slider_live_update ?? false;
    }

    get _cover_background() {
        return this._config.cover_background ?? false;
    }

    get _tap_action() {
        return {
            action: this._config.tap_action?.action || "more-info",
            navigation_path: this._config.tap_action?.navigation_path || "",
            url_path: this._config.tap_action?.url_path || "",
            service: this._config.tap_action?.service || "",
            target_entity: this._config.tap_action?.target?.entity_id || "",
            data: this._config.tap_action?.data || ""
        };
    }

    get _double_tap_action() {
        return {
            action: this._config.double_tap_action?.action || "toggle",
            navigation_path: this._config.double_tap_action?.navigation_path || "",
            url_path: this._config.double_tap_action?.url_path || "",
            service: this._config.double_tap_action?.service || "",
            target_entity: this._config.double_tap_action?.target?.entity_id || "",
            data: this._config.double_tap_action?.data || ""
        };
    }

    get _hold_action() {
        return {
            action: this._config.hold_action?.action || "toggle",
            navigation_path: this._config.hold_action?.navigation_path || "",
            url_path: this._config.hold_action?.url_path || "",
            service: this._config.hold_action?.service || "",
            target_entity: this._config.hold_action?.target?.entity_id || "",
            data: this._config.hold_action?.data || ""
        };
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

            this.allEntitiesList = Object.keys(this.hass.states).map(formateList);

            this.lightList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "light"
            ).map(formateList);

            this.sensorList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "sensor"
            ).map(formateList);

            this.binarySensorList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "binary_sensor"
            ).map(formateList);

            this.coverList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "cover"
            ).map(formateList);

            this.mediaPlayerList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "media_player"
            ).map(formateList);

            this.climateList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "climate"
            ).map(formateList);

            this.inputSelectList = Object.keys(this.hass.states)
                .filter((eid) => {
                    const entity = this.hass.states[eid];
                    const domain = eid.substr(0, eid.indexOf("."));
                    const isSelectDomain = domain === "input_select" || domain === "select";
                    const hasSelectableAttributes = this._selectable_attributes.some(attr => entity.attributes?.[attr]);
                    return isSelectDomain || hasSelectableAttributes;
                })
                .map(formateList);

                this.inputSelectList2 = {states:{}, locale : this.hass.locale, localize : this.hass.localize, entities : this.hass.entities };

                this.inputSelectList.forEach((item) => {
                    const entityId = item.label || item;
                    const entity = this.hass.states[entityId]; // Retrieve the corresponding state from hass.states
                    if (entity) {
                        this.inputSelectList2.states[entityId] = entity;
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
                },
                {
                    'label': t('editor.calendar.name'),
                    'value': 'calendar'
                }
            ];

            this.buttonTypeList = [{
                    'label': 'Switch',
                    'value': 'switch'
                },
                {
                    'label': 'Slider',
                    'value': 'slider'
                },
                {
                    'label': 'State',
                    'value': 'state'
                },
                {
                    'label': 'Name / Text',
                    'value': 'name'
                }
            ];

            this.tapActionTypeList = [{
                    'label': 'More info',
                    'value': 'more-info'
                },
                {
                    'label': 'Toggle',
                    'value': 'toggle'
                },
                {
                    'label': 'Navigate',
                    'value': 'navigate'
                },
                {
                    'label': 'URL',
                    'value': 'url'
                },
                {
                    'label': 'Call service',
                    'value': 'call-service'
                },
                {
                    'label': 'Assist',
                    'value': 'assist'
                },
                {
                    'label': 'No action',
                    'value': 'none'
                }
            ];

            this.listsUpdated = true;
        }

        const allEntitiesList = this.allEntitiesList;
        const lightList = this.lightList;
        const sensorList = this.sensorList;
        const coverList = this.coverList;
        const cardTypeList = this.cardTypeList;
        const buttonTypeList = this.buttonTypeList;
        const nameButton = this._config?.button_type === 'name';

        const cardTypeSchema = [
            {
                name: 'card_type',
                label: t('editor.common.card_type'),
                selector: {
                    select: {
                        options: this.cardTypeList,
                    },
                },
            },
        ];

        const stylingOptionsSchema = [
            {
                type: "expandable",
                name: "",
                icon: "mdi:palette",
                title: t('editor.common.styling_options'),
                schema: [
                    {
                        name: 'card_layout',
                        title: t('editor.common.card_layout'),
                        selector: {
                            select: {
                                placeholder: 'Normal',
                                mode: 'dropdown',
                                options: [
                                    {label: 'Normal', value: 'normal'},
                                    {label: 'Large (Optimized for sections)', value: 'large'},
                                    {label: 'Large with 2 sub-buttons rows (Optimized for sections)', value: 'large-2-rows'}
                                ],
                            },
                        },
                    },
                    {
                        type: "expandable",
                        name: "",
                        icon: "mdi:table",
                        title: t('editor.common.styling_options'),
                        schema: [
                            {
                                name: 'rows',
                                title: t('editor.common.rows'),
                                selector: {
                                    select: {
                                        mode: 'dropdown',
                                        options: [
                                            { label: 'Auto', value: null },
                                            { label: "1/4", value: 1 },
                                            { label: "2/4", value: 2 },
                                            { label: "3/4", value: 3 },
                                            { label: "4/4", value: 4 }
                                        ],
                                    },
                                },
                            },
                            {
                                name: 'cols',
                                title: t('editor.common.cols'),
                                selector: {
                                    select: {
                                        mode: 'dropdown',
                                        options: [
                                            { label: 'Auto', value: null },
                                            { label: "1/4", value: 1 },
                                            { label: "2/4", value: 2 },
                                            { label: "3/4", value: 3 },
                                            { label: "4/4", value: 4 }
                                        ],
                                    },
                                },
                            },
                        ]
                    }
                ]
            }
        ];

        const customStylesSchema = [
            {
                type: "expandable",
                name: "",
                icon: "mdi:code-braces",
                title: t('editor.common.custom_styles'),
                schema: [
                    {
                        name: 'styles',
                        title: t('editor.common.custom_styles'),
                        selector: {
                            template: {}
                        },
                    },
                    {
                        name: '',
                        selector: {
                            custom_style_alert: {}
                        }
                    }
                ]
            }
        ];


        if (this._config?.card_type === 'pop-up') {
            const conditions = this._config?.trigger ?? [];
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-textfield
                        label="Hash (e.g. #kitchen)"
                        .value="${this._hash}"
                        .configValue="${"hash"}"
                        @input="${this._valueChanged}"
                    ></ha-textfield>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:dock-top"></ha-icon>
                          Header settings
                        </h4>
                        <div class="content">
                            <ha-formfield .label="Optional - Show header">
                                <ha-switch
                                    aria-label="Optional - Show header"
                                    .checked=${this._show_header}
                                    .configValue="${"show_header"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Show header</label> 
                                </div>
                            </ha-formfield>
                            <ha-alert alert-type="info">You can completely hide the pop-up header, including the close button. To close it when hidden, either make a long swipe within the pop-up or click outside of it.</ha-alert>
                            <div style="${!this._show_header ? 'display: none;' : ''}">
                                <hr />
                                ${this.makeDropdown("Button type", "button_type", buttonTypeList)}
                                <ha-form
                                    .hass=${this.hass}
                                    .data=${this._config}
                                    .schema=${[
                                                { name: "entity",
                                                label: "Optional - Entity", 
                                                selector: { entity: {} },
                                                },
                                            ]}   
                                    .computeLabel=${this._computeLabelCallback}
                                    .disabled="${nameButton}"
                                    @value-changed=${this._valueChanged}
                                ></ha-form>                                         
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Icon", "icon")}
                                ${this.makeShowState()}
                                <hr />
                                <ha-expansion-panel outlined>
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                      Tap action on icon
                                    </h4>
                                    <div class="content">
                                        ${this.makeActionPanel("Tap action")}
                                        ${this.makeActionPanel("Double tap action")}
                                        ${this.makeActionPanel("Hold action")}
                                    </div>
                                </ha-expansion-panel>
                                <ha-expansion-panel outlined style="display: ${this._config.button_type === 'slider' ? 'none' : ''}">
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                      Tap action on button
                                    </h4>
                                    <div class="content">
                                        ${this.makeActionPanel("Tap action", this._button_action, this._config.button_type !== 'name' ? (this._config.button_type === 'state' ? 'more-info' : 'toggle') : 'none', 'button_action')}
                                        ${this.makeActionPanel("Double tap action", this._button_action, this._config.button_type !== 'name' ? (this._config.button_type === 'state' ? 'more-info' : 'toggle') : 'none', 'button_action')}
                                        ${this.makeActionPanel("Hold action", this._button_action, this._config.button_type !== 'name' ? 'more-info' : 'none', 'button_action')}
                                    </div>
                                </ha-expansion-panel>
                                ${this.makeSubButtonPanel()}
                            </div>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Pop-up settings
                        </h4>
                        <div class="content">
                            <ha-textfield
                                label="Optional - Auto close in milliseconds (e.g. 15000)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                step="1000"
                                .value="${this._auto_close}"
                                .configValue="${"auto_close"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Slide to close distance (default to 400)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                step="10"
                                .value="${this._slide_to_close_distance}"
                                .configValue="${"slide_to_close_distance"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Close the pop-up by clicking outside of it (a refresh is needed)">
                                <ha-switch
                                    aria-label="Optional - Close the pop-up by clicking outside of it (a refresh is needed)"
                                    .checked=${this._close_by_clicking_outside}
                                    .configValue="${"close_by_clicking_outside"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Close the pop-up by clicking outside of it (a refresh is needed)</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Close the pop-up after any click or tap">
                                <ha-switch
                                    aria-label="Optional - Close the pop-up after any click or tap"
                                    .checked=${this._close_on_click}
                                    .configValue="${"close_on_click"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Close the pop-up after any click or tap</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Update cards in background (not recommended)">
                                <ha-switch
                                    aria-label="Optional - Update cards in background (not recommended)"
                                    .checked=${this._background_update}
                                    .configValue="${"background_update"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Update cards in background (not recommended)</label> 
                                </div>
                            </ha-formfield>
                            <ha-alert alert-type="info">Background updates are only recommended if you encounter issues with certain cards within your pop-up.</ha-alert>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:bell"></ha-icon>
                          Pop-up trigger
                        </h4>
                        <div class="content">
                            <ha-card-conditions-editor
                                .hass=${this.hass}
                                .conditions=${conditions}
                                @value-changed=${(ev) => this._conditionChanged(ev)}
                            >
                            </ha-card-conditions-editor>
                            <ha-alert alert-type="info">
                                The pop-up will be opened when ALL conditions are fulfilled. For example you can open a "Security" pop-up with a camera when a person is in front of your house. You can also create a toggle helper (<code>input_boolean</code>) and trigger its opening/closing in an automation.
                            </ha-alert>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Pop-up open/close action
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Open action", this._config, 'none')}
                            ${this.makeActionPanel("Close action", this._config, 'none')}
                            <ha-alert alert-type="info">This allows you to trigger an action on pop-up open/close.</ha-alert>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            <ha-expansion-panel outlined>
                                <h4 slot="header">
                                  <ha-icon icon="mdi:palette"></ha-icon>
                                  Pop-up styling
                                </h4>
                                <div class="content"> 
                                    <ha-textfield
                                        label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                        .value="${this._margin}"
                                        .configValue="${"margin"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Top margin on mobile (e.g. -56px if your header is hidden)"
                                        .value="${this._margin_top_mobile}"
                                        .configValue="${"margin_top_mobile"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Top margin on desktop (e.g. 50vh for an half sized pop-up)"
                                        .value="${this._margin_top_desktop}"
                                        .configValue="${"margin_top_desktop"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Width on desktop (100% by default on mobile)"
                                        .value="${this._width_desktop}"
                                        .configValue="${"width_desktop"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Background color (any var, hex, rgb or rgba value)"
                                        .value="${this._bg_color}"
                                        .configValue="${"bg_color"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Background opacity (0-100 range)"
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        max="100"
                                        .value="${this._bg_opacity}"
                                        .configValue="${"bg_opacity"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Background blur (0-100 range)"
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        max="100"
                                        .value="${this._bg_blur}"
                                        .configValue="${"bg_blur"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Backdrop blur (0-100 range)"
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        max="100"
                                        .value="${this._backdrop_blur}"
                                        .configValue="${"backdrop_blur"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Shadow opacity (0-100 range)"
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        max="100"
                                        .configValue="${"shadow_opacity"}"
                                        .value="${this._shadow_opacity}""
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-formfield .label="Optional - Hide pop-up backdrop (a refresh is needed)">
                                        <ha-switch
                                            aria-label="Optional - Hide pop-up backdrop (a refresh is needed)"
                                            .checked=${this._hide_backdrop}
                                            .configValue="${"hide_backdrop"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Hide pop-up backdrop (a refresh is needed)</label> 
                                        </div>
                                    </ha-formfield>
                                    <ha-alert alert-type="warning">Set this toggle to true on the first pop-up of your main dashboard to hide the darker backdrop behind all pop-ups. <b>You can add a blurred effect to it by changing <code>Optional - Backdrop blur</code> just below, but be aware that this can slow down your dashboard when opening pop-ups. It is now set to 0 for that reason.</b></ha-alert>
                                </div>
                            </ha-expansion-panel>
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">
                        This card allows you to convert any vertical stack into a pop-up. Each pop-up is hidden by default and can be opened by targeting its link (e.g., '#pop-up-name'), with <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#example">any card</a> that supports the <code>navigate</code> action, or with the <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#horizontal-buttons-stack">horizontal buttons stack</a> that is included.
                        <br><br><b>Important:</b> This card must be placed within a <a style="color: var(--text-primary-color)" href="https://www.home-assistant.io/dashboards/vertical-stack/">vertical stack</a> card at the topmost position to function properly. To avoid misalignment with your view, place vertical stacks/pop-ups after all other dashboard cards. It should be called from the same view to work. 
                        <br><br><b>You can also watch this <a style="color: var(--text-primary-color)" href="https://www.youtube.com/watch?v=7mOV7BfWoFc">video</a> that explains how to create your first pop-up.</b>
                    </ha-alert>
                    <ha-alert alert-type="warning">Since v1.7.0, the optimized mode has been removed to ensure stability and to simplify updates for everyone. However, if your pop-up content still appears on the screen during page loading, <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#pop-up-initialization-fix">you can install this similar fix.</a></ha-alert>
                    ${this.makeVersion()}
              </div>
            `;
        } else if (this._config?.card_type === 'button') {
            let entityList = {}
            if (this._button_type === 'slider') entityList = {domain:["light", "media_player", "cover","input_number"]};

            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    ${this.makeDropdown("Button type", "button_type", buttonTypeList)}
                    <ha-form
                        .hass=${this.hass}
                        .data=${this._config}
                        .schema=${[
                                    { name: "entity",
                                    label: this._button_type !== 'slider' ? "Entity (toggle)" : "Entity (light, media_player, cover or input_number)", 
                                    selector: { entity: entityList },
                                    },
                                ]}   
                        .computeLabel=${this._computeLabelCallback}
                        .disabled="${nameButton}"
                        @value-changed=${this._valueChanged}
                    ></ha-form>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Button settings
                        </h4>
                        <div class="content">     
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action")}
                            ${this.makeActionPanel("Double tap action")}
                            ${this.makeActionPanel("Hold action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined style="display: ${this._config.button_type === 'slider' ? 'none' : ''}">
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on button
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action", this._button_action, this._config.button_type !== 'name' ? (this._config.button_type === 'state' ? 'more-info' : 'toggle') : 'none', 'button_action')}
                            ${this.makeActionPanel("Double tap action", this._button_action, this._config.button_type !== 'name' ? (this._config.button_type === 'state' ? 'more-info' : 'toggle') : 'none', 'button_action')}
                            ${this.makeActionPanel("Hold action", this._button_action, this._config.button_type !== 'name' ? 'more-info' : 'none', 'button_action')}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card allows you to control your entities. ${this._config.button_type === 'slider' ? 'Supported entities: Light (brightness), media player (volume), cover (position), fan (percentage), climate (temperature), input number and number (value). To access color / control of an entity, simply tap on the icon.' : ''}</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'separator') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-textfield
                        label="Name"
                        .value="${this._name}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                    ></ha-textfield>
                    ${this.makeDropdown("Icon", "icon")}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card is a simple separator for dividing your pop-up into categories / sections. e.g. Lights, Devices, Covers, Settings, Automations...</ha-alert>
                    ${this.makeVersion()}
              </div>
            `;
        } else if (this._config?.card_type === 'horizontal-buttons-stack') {
            if (!this.buttonAdded) {
                this.buttonAdded = true;
                this.buttonIndex = 0;

                while (this._config[(this.buttonIndex + 1) + '_link']) {
                    this.buttonIndex++;
                }
            }

            function addButton() {
                this.buttonIndex++;
                this.requestUpdate();
            }

            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <div id="buttons-container">
                        ${this.makeButton()}
                    </div>
                    <button class="icon-button" @click="${addButton}">
                        <ha-icon icon="mdi:plus"></ha-icon>
                        New button
                    </button>
                    <ha-formfield .label="Auto order">
                        <ha-switch
                            aria-label="Toggle auto order"
                            .checked=${this._auto_order}
                            .configValue="${"auto_order"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Auto order (Presence/occupancy sensors needed)</label> 
                        </div>
                    </ha-formfield>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">  
                            <ha-expansion-panel outlined>
                                <h4 slot="header">
                                  <ha-icon icon="mdi:palette"></ha-icon>
                                  Horizontal buttons stack styling
                                </h4>
                                <div class="content"> 
                                    <ha-textfield
                                        label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                        .value="${this._margin}"
                                        .configValue="${"margin"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-textfield
                                        label="Optional - Width on desktop (100% by default on mobile)"
                                        .value="${this._width_desktop}"
                                        .configValue="${"width_desktop"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    <ha-formfield .label="Optional - Rise animation (Displays an animation once the page has loaded)">
                                        <ha-switch
                                            aria-label="Optional - Rise animation (Displays an animation once the page has loaded)"
                                            .checked=${this._rise_animation}
                                            .configValue="${"rise_animation"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Rise animation (Displays an animation once the page has loaded)</label> 
                                        </div>
                                    </ha-formfield>
                                    <ha-formfield .label="Optional - Highlight current hash / view">
                                        <ha-switch
                                            aria-label="Optional - Highlight current hash / view"
                                            .checked=${this._highlight_current_view}
                                            .configValue="${"highlight_current_view"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Highlight current hash / view</label> 
                                        </div>
                                    </ha-formfield>
                                    <ha-formfield .label="Optional - Hide gradient">
                                        <ha-switch
                                            aria-label="Optional - Hide gradient"
                                            .checked=${this._hide_gradient}
                                            .configValue="${"hide_gradient"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Hide gradient</label> 
                                        </div>
                                    </ha-formfield>
                                </div>
                            </ha-expansion-panel>
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card is the companion to the pop-up card, allowing you to open the corresponding pop-ups. It also allows you to open any page of your dashboard. In addition, you can add your motion sensors so that the order of the buttons adapts according to the room you just entered. This card is scrollable, remains visible and acts as a footer.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'cover') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-form
                        .hass=${this.hass}
                        .data=${this._config}
                        .schema=${[
                                    { name: "entity",
                                    label: "Entity", 
                                    selector: { entity: {domain:["cover"]}  },
                                    },
                                ]}   
                        .computeLabel=${this._computeLabelCallback}
                        @value-changed=${this._valueChanged}
                    ></ha-form>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Cover settings
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name || ''}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Open icon", "icon_open")}
                            ${this.makeDropdown("Optional - Closed icon", "icon_close")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                          Custom services
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Open service (cover.open_cover by default)"
                                .value="${this._open_service}"
                                .configValue="${"open_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Stop service (cover.stop_cover by default)"
                                .value="${this._stop_service}"
                                .configValue="${"stop_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Close service (cover.close_cover by default)"
                                .value="${this._close_service}"
                                .configValue="${"close_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action")}
                            ${this.makeActionPanel("Double tap action")}
                            ${this.makeActionPanel("Hold action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content"> 
                            ${this.makeLayoutOptions()}
                            <ha-expansion-panel outlined>
                                <h4 slot="header">
                                  <ha-icon icon="mdi:palette"></ha-icon>
                                  Cover styling
                                </h4>
                                <div class="content"> 
                                    ${this.makeDropdown("Optional - Arrow down icon", "icon_down")}
                                    ${this.makeDropdown("Optional - Arrow up icon", "icon_up")}
                                </div>
                            </ha-expansion-panel>
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card allows you to control your covers.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'media-player') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-form
                        .hass=${this.hass}
                        .data=${this._config}
                        .schema=${[
                                    { name: "entity",
                                    label: "Entity", 
                                    selector: { entity: {domain:["media_player"]}  },
                                    },
                                ]}   
                        .computeLabel=${this._computeLabelCallback}
                        @value-changed=${this._valueChanged}
                    ></ha-form>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Media player settings
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name || ''}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:eye-off"></ha-icon>
                          Display/hide buttons
                        </h4>
                        <div class="content"> 
                            <ha-formfield .label="Optional - Hide play/pause button">
                                <ha-switch
                                    aria-label="Optional - Hide play/pause button"
                                    .checked=${this._hide_play_pause_button}
                                    .configValue="${"hide.play_pause_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide play/pause button</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide volume button">
                                <ha-switch
                                    aria-label="Optional - Hide volume button"
                                    .checked=${this._hide_volume_button}
                                    .configValue="${"hide.volume_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide volume button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide next button">
                                <ha-switch
                                    aria-label="Optional - Hide next button"
                                    .checked=${this._hide_next_button}
                                    .configValue="${"hide.next_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide next button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide previous button">
                                <ha-switch
                                    aria-label="Optional - Hide previous button"
                                    .checked=${this._hide_previous_button}
                                    .configValue="${"hide.previous_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide previous button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide power button">
                                <ha-switch
                                    aria-label="Optional - Hide power button"
                                    .checked=${this._hide_power_button}
                                    .configValue="${"hide.power_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide power button</label>
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action")}
                            ${this.makeActionPanel("Double tap action")}
                            ${this.makeActionPanel("Hold action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            <ha-expansion-panel outlined>
                                <h4 slot="header">
                                  <ha-icon icon="mdi:palette"></ha-icon>
                                  Media player styling
                                </h4>
                                <div class="content"> 
                                    <ha-formfield .label="Optional - Blurred media cover in background">
                                        <ha-switch
                                            aria-label="Optional - Blurred media cover in background"
                                            .checked=${this._cover_background}
                                            .configValue="${"cover_background"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Blurred media cover in background</label> 
                                        </div>
                                    </ha-formfield>
                                </div>
                            </ha-expansion-panel>
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card allows you to control a media player. You can tap on the icon to get more control.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'empty-column') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">Just an empty card to fill any empty column.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'select') {
            const entity = this._config.entity;
            const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || this._config.select_attribute;
            const entityAttribute = this.hass.states[entity]?.attributes;
            const hasSelectAttributeList = this._selectable_attributes.some(attr => entityAttribute?.[attr]);
            const selectableAttributeList = Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
                let state = this.hass.states[entity];
                let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
                return { label: formattedName, value: attributeName };
            }).filter(attribute => this._selectable_attributes.includes(attribute.value));

            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-form
                        .hass=${this.inputSelectList2}
                        .data=${this._config}
                        .schema=${[
                                    { name: "entity",
                                    label: "Entity", 
                                    selector: { entity: {}},
                                    },
                                ]}   
                        .computeLabel=${this._computeLabelCallback}
                        @value-changed=${this._valueChanged}
                    ></ha-form>
                    ${hasSelectAttributeList ? html`
                        <div class="ha-combo-box">
                            <ha-combo-box
                                label="Select menu (from attributes)"
                                .value="${this._config.select_attribute}"
                                .items="${selectableAttributeList}"
                                .configValue="${"select_attribute"}"
                                @value-changed="${this._valueChanged}"
                            ></ha-combo-box>
                        </div>
                    ` : ''}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Button settings
                        </h4>
                        <div class="content">                   
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action")}
                            ${this.makeActionPanel("Double tap action")}
                            ${this.makeActionPanel("Hold action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">
                      This card allows you to have a select menu for your 
                      <code>input_select</code>, <code>select</code> entities, and 
                      any other entities that have attribute lists like 
                      <code>source_list</code>, <code>sound_mode_list</code>, 
                      <code>hvac_modes</code>, <code>fan_modes</code>, 
                      <code>swing_modes</code>, <code>preset_modes</code>, or 
                      <code>effect_list</code>.
                    </ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config?.card_type === 'calendar') {
                        const schema = [
                            ...cardTypeSchema,
                            {
                                type: "expandable",
                                name: "",
                                icon: "mdi:calendar",
                                title: t('editor.calendar.configuration'),
                                schema: [
                                    {
                                        name: 'limit',
                                        title: t('editor.calendar.limit'),
                                        selector: { number: {} },
                                    },
                                    {
                                        name: "entities",
                                        title: t('editor.calendar.entities'),
                                        selector: { calendar_entity: {} },
                                    },
                                ]
                            },
                            ...stylingOptionsSchema,
                            ...customStylesSchema,
                            {
                                name: "sub_button",
                                selector: {
                                    sub_button: {}
                                }
                            },
                            {
                                name: "",
                                selector: {
                                    bubble_card_version: { version }
                                }
                            }
                        ];
        
        
                        const valueChanged = (ev) => {
                            let config = ev.detail.value;
                            console.log(ev.detail, config, this._config);
        
                            fireEvent(this, "config-changed", { config }, undefined);
                            this._config = config;
                            this.requestUpdate();
                        }
        
                        const computeLabel = (schema) => {
                            return schema.title || schema.label;
                        }
            

                        return html`
                            <ha-form
                                .hass=${this.hass}
                                .data=${this._config}
                                .schema=${schema}
                                .computeLabel=${computeLabel}
                                @value-changed=${valueChanged}
                            ></ha-form>
                        `;
        } else if (this._config?.card_type === 'climate') {
            if (
                this._config.card_type === "climate" && 
                !this.climateSubButtonsAdded &&
                this._config.entity
            ) {
                const shouldAddHVACModes = this.hass.states[this._config.entity]?.attributes?.hvac_modes;

                if (!this._config.sub_button || this._config.sub_button.length === 0) {
                    this._config.sub_button = [
                        shouldAddHVACModes ? { 
                            name: 'HVAC modes menu', 
                            select_attribute: 'hvac_modes', 
                            state_background: false,
                            show_arrow: false 
                        } : null
                    ].filter(Boolean);
                }

                this.climateSubButtonsAdded = true;
            }

            return html`
                <div class="card-config">
                ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${[
                                { name: "entity",
                                label: "Entity", 
                                selector: { entity: {domain:["climate"]}  },
                                },
                            ]}   
                    .computeLabel=${this._computeLabelCallback}
                    @value-changed=${this._valueChanged}
                ></ha-form>
                                        <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Climate settings
                        </h4>
                        <div class="content">     
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                            ${this.hass.states[this._config.entity]?.attributes?.target_temp_low ? html`
                                <ha-formfield .label="Optional - Hide target temp low">
                                    <ha-switch
                                        aria-label="Optional - Hide target temp low"
                                        .checked=${this._config.hide_target_temp_low}
                                        .configValue="${"hide_target_temp_low"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide target temp low</label> 
                                    </div>
                                </ha-formfield>
                            ` : ''}
                            ${this.hass.states[this._config.entity]?.attributes?.target_temp_high ? html`
                                <ha-formfield .label="Optional - Hide target temp high">
                                    <ha-switch
                                        aria-label="Optional - Hide target temp high"
                                        .checked=${this._config.hide_target_temp_high}
                                        .configValue="${"hide_target_temp_high"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide target temp high</label> 
                                    </div>
                                </ha-formfield>
                            ` : ''}
                            <ha-formfield .label="Optional - Constant background color when ON">
                                <ha-switch
                                    aria-label="Optional - Constant background color when ON"
                                    .checked=${this._config.state_color === true}
                                    .configValue="${"state_color"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Constant background color when ON</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeActionPanel("Tap action")}
                            ${this.makeActionPanel("Double tap action")}
                            ${this.makeActionPanel("Hold action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            ${this.makeLayoutOptions()}
                            ${this.makeStyleEditor()}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card allows you to control your climate entities. You can also add a sub-button that display a select menu for your climate modes (check if you have "Select menu" available when you create a new sub-button).</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (!this._config?.card_type) {
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
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:table"></ha-icon>
                    Layout options for sections
                </h4>
                <div class="content">
                    <ha-combo-box
                        label="Columns"
                        .value="${this._config.columns}"
                        .configValue="${"columns"}"
                        .items="${[{label: 'Auto', value: null}, {label: "1/4", value: 1}, {label: "2/4", value: 2}, {label: "3/4", value: 3}, {label: "4/4", value: 4}]}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                    <ha-combo-box
                        label="Rows"
                        .value="${this._config.rows}"
                        .configValue="${"rows"}"
                        .items="${[{label: 'Auto', value: null}, {label: "1/4", value: 1}, {label: "2/4", value: 2}, {label: "3/4", value: 3}, {label: "4/4", value: 4}]}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                </div>
            </ha-expansion-panel>
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
                        .checked=${this._slider_live_update}
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

    makeButton() {
        let buttons = [];
        for (let i = 1; i <= this.buttonIndex; i++) {
            buttons.push(html`
                <div class="${i}_button">
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                            <ha-icon icon="mdi:border-radius"></ha-icon>
                            Button ${i} ${this._config[i + '_name'] ? ("- " + this._config[i + '_name']) : ""}
                            <button class="icon-button header" @click="${() => this.removeButton(i)}">
                              <ha-icon icon="mdi:delete"></ha-icon>
                            </button>
                        </h4>
                        <div class="content">
                            <ha-textfield
                                label="Link / Hash to pop-up (e.g. #kitchen)"
                                .value="${this._config[i + '_link'] || ''}"
                                .configValue="${i}_link"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._config[i + '_name'] || ''}"
                                .configValue="${i}_name"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-icon-picker
                                label="Optional - Icon"
                                .value="${this._config[i + '_icon'] || ''}"
                                .configValue="${i}_icon"
                                item-label-path="label"
                                item-value-path="value"
                                @value-changed="${this._valueChanged}"
                            ></ha-icon-picker>
                        <ha-form
                            .hass=${this.hass}
                            .data=${this._config}
                            .schema=${[
                                        { name: i+"_entity",
                                          label: "Optional - Light / Light group (For background color)", 
                                          selector: { entity: {} },
                                        },
                                    ]}   
                            .computeLabel=${this._computeLabelCallback}
                            @value-changed=${this._valueChanged}
                        ></ha-form>
                        <ha-form
                            .hass=${this.hass}
                            .data=${this._config}
                            .schema=${[
                                        { name: i+"_pir_sensor",
                                          label: "Optional - Presence / Occupancy sensor (For button auto order)", 
                                          selector: { entity: {} },
                                        },
                                    ]}   
                            .computeLabel=${this._computeLabelCallback}
                            @value-changed=${this._valueChanged}
                        ></ha-form>
                        <ha-alert alert-type="info">In fact you can also get the auto order with any entity type, for example you can add light groups to these fields and the order will change based on the last changed states.</ha-alert>
                    </div>
                </ha-expansion-panel>
            </div>
        `);
    }

        return buttons;
    }

    makeVersion() {
        return html`
            <h4 style="
                font-size: 12px !important;
                color: #fff;
                background: rgba(0,0,0,0.1);
                padding: 8px 16px;
                border-radius: 32px;
            ">
                Bubble Card 
                <span style="
                    font-size: 10px;
                    background: rgba(0,120,180,1);
                    padding: 0px 8px;
                    border-radius: 12px;
                    margin-right: -6px;
                    float: right;
                    color: white;
                ">
                    ${version}
                </span>
            </h4>
        `;
    }

    removeButton(index) {
        // Removing button fields
        delete this._config[index + '_name'];
        delete this._config[index + '_icon'];
        delete this._config[index + '_link'];
        delete this._config[index + '_entity'];
        delete this._config[index + '_pir_sensor'];

        // Updating indexes of following buttons
        for (let i = index; i < this.buttonIndex; i++) {
            this._config[i + '_name'] = this._config[(i + 1) + '_name'];
            this._config[i + '_icon'] = this._config[(i + 1) + '_icon'];
            this._config[i + '_link'] = this._config[(i + 1) + '_link'];
            this._config[i + '_entity'] = this._config[(i + 1) + '_entity'];
            this._config[i + '_pir_sensor'] = this._config[(i + 1) + '_pir_sensor'];
        }

        // Removing fields of the last button
        delete this._config[this.buttonIndex + '_name'];
        delete this._config[this.buttonIndex + '_icon'];
        delete this._config[this.buttonIndex + '_link'];
        delete this._config[this.buttonIndex + '_entity'];
        delete this._config[this.buttonIndex + '_pir_sensor'];

        // Updating index of the last button
        this.buttonIndex--;

        fireEvent(this, "config-changed", {
            config: this._config
        });
    }

    makeStyleEditor() {
        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                    Custom styles / Templates
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
                    <ha-alert alert-type="info">
                      For advanced users, you can edit the CSS style of this card in this editor. More information <a href="https://github.com/Clooos/Bubble-Card#styling">here</a>. You don't need to add <code>styles: |</code>, it will be added automatically. You can also add <a href="https://github.com/Clooos/Bubble-Card#templates">templates</a>.
                      <br><br><b>Looking for more advanced examples?</b> Check out my <a href="https://www.patreon.com/Clooos">Patreon</a> for exclusive custom styles and advanced templates, this is also the best way to show your support to my project!
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
        if (schema.label){
            return schema.label
        }else{
            switch (schema.name) {
            case "theme": return "Theme"
            case "hold_action": return "Hold Action"
            case "double_tap_action": return "Double tap action"
            case "open_action": return "Open action"
            case "close_action": return "Close action"
            default: return "Tap action"
            };
        }
    };

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
            div {
              display: grid;
              grid-gap: 12px;
            }

            ha-combo-box[label="Card type"]::after {
              content: "";
              position: relative;
              background-color: var(--background-color, var(--secondary-background-color));
              display: block;
              width: 100%;
              height: 1px;
              top: 12px;
              margin-bottom: 12px !important;
              opacity: 0.6;
            }

            #add-button {
              margin: 0 0 14px 0;
              color: var(--text-primary-color);
              width: 100%;
              height: 32px;
              border-radius: 16px;
              border: none;
              background-color: var(--accent-color);
              cursor: pointer;
            }

            p {
              margin-bottom: 4px;
            }

            ha-icon, a, p, button, h4 {
              color: var(--primary-text-color) !important;
            }

            hr {
              display: inline-block;
              width: 100%;
              border: 1px solid var(--background-color, var(--secondary-background-color));
              opacity: 0.6;
              margin: 8px 0 0 0;
            }

            code {
              background: var(--accent-color);
              background-blend-mode: darken;
              padding: 2px 4px;
              border-radius: 6px;
            }

            .button-header {
              height: auto;
              width: 100%;
              display: inline-flex;
              align-items: center;
              margin: 0 8px;
            }

            .button-number {
              display: inline-flex;
              width: auto;
            }

            .remove-button {
              display: inline-flex;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              text-align: center;
              line-height: 24px;
              vertical-align: middle;
              cursor: pointer;
            }

            .content {
              margin: 12px 4px 14px 4px;
            }

            h4 > ha-icon {
              margin: 8px;
            }

            ha-textfield {
              width: 100%;
            }

            h3 {
              margin: 4px 0;
            }

            .code-editor {
                overflow: scroll;
            }

            .icon-button {
                background: var(--accent-color);
                border: none;
                cursor: pointer;
                padding: 8px;
                margin: 0;
                border-radius: 32px;
                font-weight: bold;
              }

              .icon-button.header {
                background: none;
                float: right;
                padding: 0;
                margin: 0 8px;
              }

              ha-card-conditions-editor {
                margin-top: -12px;
              }
          `;
      }
  }

  customElements.define('bubble-card-editor', BubbleCardEditor);
