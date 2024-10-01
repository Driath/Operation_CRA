import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissionListComponent } from './components/list.component';
import { DropdownModule } from 'primeng/dropdown';
import { MissionStore } from './store';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ColorIndicatorComponent } from '../color-indicator/color-indicator.component';

@Component({
    selector: 'app-mission',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MissionListComponent,
        DropdownModule,
        CardModule,
        DividerModule,
        ColorIndicatorComponent,
    ],
    template: `
        <p-card header="Missions">
            <app-mission-list />
            <p-divider />
            <div class="flex gap-2 items-center">
                <app-color-indicator [color]="missionStore.selectedMission().color" />
                <p-dropdown
                    [optionValue]="'id'"
                    [optionLabel]="'name'"
                    [options]="missionStore.missions()"
                    [ngModel]="missionStore.selectedMission().id"
                    (ngModelChange)="missionStore.setSelectedMission($event)"
                    tabindex="4"
                />
            </div>
        </p-card>
    `,
})
export class MissionComponent {
    missionStore = inject(MissionStore);
}
