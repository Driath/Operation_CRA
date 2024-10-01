import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-instructions',
    standalone: true,
    template: `
        <p-card>
            <p>
                Hello cher(e) administra(teur/trice) de nos chers valeureux Agents,<br />
                Afin d'inputer, il faut selectionner un agent, une mission, et vous aurez la
                possibilité de toggle la mission selectionnée selon l'agent selectionné en cliquant
                sur la date de l'imputation voulue
            </p>
        </p-card>
    `,
    imports: [CardModule],
})
export class InstructionComponent {}
