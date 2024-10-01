import { Component, inject, signal } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarStore } from '../../store';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-calendar-header',
    standalone: true,
    imports: [DropdownModule, FormsModule, JsonPipe],
    templateUrl: './header.component.html',
})
export class CalendarHeaderComponent {
    calendarStore = inject(CalendarStore);
    selectedYear = signal(this.calendarStore.date().getFullYear());
}
