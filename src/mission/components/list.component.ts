import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MissionStore } from '../store';
import { TooltipModule } from 'primeng/tooltip';
import { ColorIndicatorComponent } from '../../color-indicator/color-indicator.component';

@Component({
    selector: 'app-mission-list',
    standalone: true,
    imports: [CommonModule, TooltipModule, ColorIndicatorComponent],
    templateUrl: './list.component.html',
})
export class MissionListComponent {
    readonly missionStore = inject(MissionStore);
}
