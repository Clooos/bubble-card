import { html } from "lit";
import setupTranslation from '../../tools/localize.js';
import "../../custom-elements/ha-selector-calendar_entity.js";

export function renderCalendarEditor(editor){
    const t = setupTranslation(editor.hass);

    return html`
        <div class="card-config">
            ${editor.makeDropdown("Card type", "card_type", editor.cardTypeList)}
            <ha-form
                .hass=${editor.hass}
                .data=${editor._config}
                .schema=${[
                  {
                    name: "entities",
                    title: t('editor.calendar.entities'),
                    selector: { calendar_entity: {} },
                  },
                ]}   
                .computeLabel=${editor._computeLabelCallback}
                @value-changed=${editor._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  ${t('editor.calendar.settings')}
                </h4>
                <div class="content">
                    <ha-form
                      .hass=${editor.hass}
                      .data=${editor._config}
                      .schema=${[
                        {
                          name: 'limit',
                          label: t('editor.calendar.limit'),
                          title: t('editor.calendar.limit'),
                          selector: { number: { step: 1, min: 1} },
                        },
                        {
                          name: 'show_end',
                          label: t('editor.calendar.show_end'),
                          title: t('editor.calendar.show_end'),
                          selector: { boolean: {} },
                        },
                        {
                          name: 'show_progress',
                          label: t('editor.calendar.show_progress'),
                          title: t('editor.calendar.show_progress'),
                          selector: { boolean: {} },
                        }
                      ]}   
                      .computeLabel=${editor._computeLabelCallback}
                      @value-changed=${editor._valueChanged}
                    ></ha-form>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  Tap action on icon
                </h4>
                <div class="content">
                    ${editor.makeActionPanel("Tap action")}
                    ${editor.makeActionPanel("Double tap action")}
                    ${editor.makeActionPanel("Hold action")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  Styling options
                </h4>
                <div class="content">
                    ${editor.makeLayoutOptions()}
                    ${editor.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${editor.makeSubButtonPanel()}
            <ha-alert alert-type="info">This card allows you to control a calendar. You can tap on the icon to get more control.</ha-alert>
            ${editor.makeVersion()}
        </div>
    `;    
}