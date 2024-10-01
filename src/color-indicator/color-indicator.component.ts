import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-color-indicator',
    standalone: true,
    template: ` <div [style.backgroundColor]="color" class="w-2 h-2 rounded-full"></div> `,
})
export class ColorIndicatorComponent {
    @Input({ required: true }) color!: string;
}
