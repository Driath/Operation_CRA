import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarStore } from '../calendar/store';
import { CalendarHeaderComponent } from '../calendar/components/header/header.component';
import { MissionListComponent } from '../mission/components/list.component';
import { ImputationsComponent } from '../imputation/components/imputations/imputations.component';
import { AgentsComponent } from '../agent/components/agents/agents.component';
import { Card, CardModule } from 'primeng/card';
import { InstructionComponent } from './instructions/instruction.component';
import { MissionComponent } from '../mission/mission.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CalendarHeaderComponent,
        MissionComponent,
        ImputationsComponent,
        AgentsComponent,
        CardModule,
        InstructionComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'Operation_CRA';

    calendarStore = inject(CalendarStore);
}
