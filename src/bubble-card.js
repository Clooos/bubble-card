import { version } from './var/version.js';
import { initializeContent } from './tools/init.js';
import { handlePopUp } from './cards/pop-up/index.js';
import { handleHorizontalButtonsStack } from './cards/horizontal-buttons-stack/index.js';
import { handleButton } from './cards/button/index.js';
import { handleSeparator } from './cards/separator/index.js';
import { handleCover } from './cards/cover/index.js';
import { handleEmptyColumn } from './cards/empty-column/index.js';
import { handleCalendar } from './cards/calendar/index.ts';
import { handleMediaPlayer } from './cards/media-player/index.js';
import { handleSelect } from './cards/select/index.js';
import { handleClimate } from './cards/climate/index.js';
import BubbleCardEditor from './editor/bubble-card-editor.js';

let editor;

class BubbleCard extends HTMLElement {
    editor = false;
    isConnected = false;

    connectedCallback() {
        this.isConnected = true;

        if (this._hass) {
            this.updateBubbleCard();
        }
    }

    disconnectedCallback() {
        this.isConnected = false;
    }

    set editMode(editMode) {
        if (this.editor === editMode) {
            return;
        }

        this.editor = editMode;

        if (this._hass) {
            this.updateBubbleCard();
        }
    }

    set hass(hass) {
        initializeContent(this);

        this._hass = hass;

        if (this.editor) return;

        if (this.isConnected || this.config.card_type === 'pop-up') {
            this.updateBubbleCard();
        }
    }

    updateBubbleCard() {

        switch (this.config.card_type) {

            // Update pop-up card
            case 'pop-up':
                handlePopUp(this);
                break;

            // Update button
            case 'button' :
                handleButton(this);
                break;

            // Update separator
            case 'separator' :
                handleSeparator(this);
                break;

            // Update cover card
            case 'cover' :
                handleCover(this);
                break;

            // Update empty card
            case 'empty-column' :
                handleEmptyColumn(this);
                break;

            // Update horizontal buttons stack
            case 'horizontal-buttons-stack' :
                handleHorizontalButtonsStack(this);
                break;

            // Update calendar
            case 'calendar' :
                handleCalendar(this);
                break;

            // Update media player
            case 'media-player' :
                handleMediaPlayer(this);
                break;

            // Update select
            case 'select' :
                handleSelect(this);
                break;

            // Update climate
            case 'climate' :
                handleClimate(this);
                break;
        }
    }

    setConfig(config) {
        // Check if there's an error in the config
        if (config.error) {
            throw new Error(config.error);
        }

        if (config.card_type === 'pop-up') {
            if (!config.hash) {
                throw new Error("You need to define an hash. Please note that this card must be placed inside a vertical_stack to work as a pop-up.");
            }
        } else if (config.card_type === 'horizontal-buttons-stack') {
            var definedLinks = {};
            
            for (var key in config) {
              if (key.match(/^\d+_icon$/)) {
                var iconKey = key;
                var linkKey = key.replace('_icon', '_link');
            
                if (config[linkKey] === undefined) {
                    throw new Error("You need to define " + linkKey);
                }
            
                if (definedLinks[config[linkKey]]) {
                    throw new Error("You can't use " + config[linkKey] + " twice" );
                }
            
                definedLinks[config[linkKey]] = true;
              }
            }
        } else if (['button', 'cover', 'climate', 'select', 'media-player'].includes(config.card_type)) {
            if (!config.entity && config.button_type !== 'name') {
                throw new Error("You need to define an entity");
            }
        } else if (config.card_type === 'calendar') {
            if (!config.entities) {
                throw new Error("You need to define an entity list");
            }
        }

        if (config.card_type === 'select' && config.entity && !config.select_attribute) {
            const isSelectEntity = config.entity?.startsWith("input_select") || config.entity?.startsWith("select");
            if (!isSelectEntity) {
                throw new Error('"Select menu (from attributes)" missing');
            }
        }

        if (window.entityError) {
            throw new Error("You need to define a valid entity");
        }
        if (config.card_type === 'button') {
            const enhancedConfig = {...config};
            const buttonType = enhancedConfig.button_type || 'switch';

            enhancedConfig.tap_action = enhancedConfig.tap_action ?? {
                action: "more-info"
            };
            enhancedConfig.double_tap_action = enhancedConfig.double_tap_action ?? {
                action: buttonType === "state" ? "more-info" : "toggle"
            }
            enhancedConfig.hold_action = enhancedConfig.hold_action ?? {
                action: buttonType === "state" ? "more-info" : "toggle"
            }

            this.config = enhancedConfig;
        } else {
            this.config = config;
        }

        if (this._hass) {
            this.updateBubbleCard();
        }
    }

    getCardSize() {
        switch (this.config.card_type) {
            case 'pop-up':
                return -100000;
            case 'button':
                return 1;
            case 'separator':
                return 1;
            case 'cover':
                return 2;
            case 'empty-column':
                return 1;
            case 'horizontal-buttons-stack':
                return 0;
            case 'calendar':
                return 1;
            case 'media-player':
                return 1;
            case 'select':
                return 1;
            case 'climate':
                return 1;
        }
    }

    static getConfigElement() {
        return document.createElement("bubble-card-editor");
    }

    getLayoutOptions() {
        let  defaultRows = 1;
        if (this.config.card_type === 'pop-up') {
            defaultRows = 0;
        } else if (this.config.card_type === 'horizontal-buttons-stack') {
            defaultRows = 1;
        } else if (['cover'].includes(this.config.card_type)) {
            defaultRows = 2;
        }

        let  defaultColumns = 4;
        if (this.config.card_type === 'pop-up') {
            defaultColumns = 0;
        } else if (this.config.card_type === 'horizontal-buttons-stack') {
            defaultColumns = 4;
        }

        return {
            grid_columns: this.config.columns ?? defaultColumns,
            grid_rows: this.config.rows ?? defaultRows,
        }
    }
}

customElements.define("bubble-card", BubbleCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "bubble-card",
    name: "Bubble Card",
    preview: false,
    description: "A minimalist card collection with a nice pop-up touch.",
    documentationURL: "https://github.com/Clooos/Bubble-Card/"
});

console.info(
    `%c Bubble Card %c ${version} `,
    'background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)',
    'background-color: #506eac;color: #fff;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)'
);