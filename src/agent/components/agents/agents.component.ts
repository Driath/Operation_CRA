import { Component, inject } from '@angular/core';
import { AgentStore } from '../../store';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-agents',
    standalone: true,
    templateUrl: './agents.component.html',
    imports: [CardModule, DropdownModule, FormsModule, JsonPipe],
})
export class AgentsComponent {
    agentStore = inject(AgentStore);
}
