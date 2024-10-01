import { CommonModule } from '@angular/common';
import { Component, inject, Input, computed } from '@angular/core';
import { CalendarStore } from '../../../calendar/store';
import { TableModule } from 'primeng/table';
import { getDaysOfWeek } from '../../../date/utils/days-of-week';
import { getWeeks } from '../../../date/utils/week';
import { CardModule } from 'primeng/card';
import { SettingsStore } from '../../../settings/store';
import { ImputationStore } from '../../store';
import { AgentStore } from '../../../agent/store';
import { MissionStore } from '../../../mission/store';
import { ImputationWithColor } from '../../imputation';
import { ColorIndicatorComponent } from '../../../color-indicator/color-indicator.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-imputation-month',
    standalone: true,
    imports: [CommonModule, TableModule, CardModule, ColorIndicatorComponent, ButtonModule],
    styles: [
        `
            th {
                text-align: center;
            }
            tr {
                border-bottom-width: 1px;
                border-bottom-color: #676767;
            }
        `,
    ],
    templateUrl: './month.component.html',
})
export class MonthComponent {
    @Input({ required: true }) monthNumber = 0;
    @Input({ required: true }) year = 0;
    imputationStore = inject(ImputationStore);
    calendarStore = inject(CalendarStore);
    settingsStore = inject(SettingsStore);
    agentStore = inject(AgentStore);
    daysOfWeek = computed(() =>
        getDaysOfWeek(this.calendarStore.daysOfWeekRef(), this.settingsStore.i18n()),
    );

    missionStore = inject(MissionStore);

    /**
     * TO DISCUSS : does this should be in store ? or component responsibility ? nvm ?
     **/
    weeks = computed(() => {
        const month = this.monthNumber;
        const year = this.calendarStore.date().getFullYear();
        const firstDayOfWeek = this.calendarStore.daysOfWeekRef().getDay();
        const currentAgentId = this.agentStore.selectedAgent().id;
        const colorIdMap = this.missionStore.getColorsId();
        const imputations: ImputationWithColor[] = this.imputationStore
            .imputations()
            .filter(
                imputation =>
                    imputation.date.getMonth() === this.monthNumber &&
                    imputation.date.getFullYear() === this.year &&
                    imputation.agentId === currentAgentId,
            )
            .map(imputation => ({
                ...imputation,
                color: colorIdMap.get(imputation.missionId) as string,
            }));

        return getWeeks(month, year, firstDayOfWeek, imputations);
    });
}
