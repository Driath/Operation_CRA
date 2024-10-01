import { Component, inject } from '@angular/core';
import { MonthComponent } from '../month/month.component';
import { CalendarStore } from '../../../calendar/store';
import { ImputationStore } from '../../store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-imputations',
    standalone: true,
    imports: [MonthComponent, JsonPipe],
    templateUrl: './imputations.component.html',
})
export class ImputationsComponent {
    calendarStore = inject(CalendarStore);

    imputationStore = inject(ImputationStore);
}
